const simpleGit = require('simple-git');
const config = require('./gh_release.config.json')
var path = require('path'), fs=require('fs');

const CHANGELOG_FOLDER = ".changelogs"

const regexp = {
    'fix': new RegExp('^fix.+$', 'gi'),
    'feat': new RegExp('^feat.+$', 'gi'),
    'others': new RegExp('^(?!fix|feat).+$', 'gi')
}

const generateChanges = (type, changes) => {
    let generated = ''
    for (let change of changes) {
        if (change.message.match(regexp[type])) {
            generated += `- ${change.message} ${ config.skip_authors.includes(change.author) ? "" : `(author: ${change.author})` }\n`
        }
    }
    return generated
}

const searchAndModifyVersions = (currentRepoGit, startPath, filter, version) => {
    if (!fs.existsSync(startPath)){
        return;
    }
    const files = fs.readdirSync(startPath);
    for(var i = 0; i < files.length; i++){
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory() && filename.indexOf("node_modules") === -1){
            searchAndModifyVersions(currentRepoGit, filename, filter, version);
        }
        else if (filename.indexOf(filter) >= 0) {
            const content = JSON.parse(fs.readFileSync(filename))
            content['version'] = version
            fs.writeFileSync(filename, JSON.stringify(content, null, 2))
        };
    };
};

const main = async () => {
    let result = ''
    const currentRepoGit = simpleGit();
    const version = process.argv.slice(2)[0];
    fs.mkdirSync(CHANGELOG_FOLDER, { recursive: true });
    if (!version) {
        console.log("Version parameter is required!")
        process.exit(0)
    }

    console.log(`📦 Preparing release ${version}..`)

    for (const path of config.src_folders) {
        searchAndModifyVersions(currentRepoGit, path, "package.json", version)
        searchAndModifyVersions(currentRepoGit, path, "package-lock.json", version)
    }

    await currentRepoGit.add(['.'])

    const versionName = `v${version}`
    await currentRepoGit.commit(versionName)
    await currentRepoGit.tag(['-a', versionName, '-m', versionName])
    await currentRepoGit.push('origin');
    await currentRepoGit.pushTags('origin');

    const tagDates = (await currentRepoGit.tag()).split('\n').filter(el => el.length > 0).reverse()
    const changes = (await currentRepoGit.log({from: tagDates[0], to: tagDates[1]}))
        .all.map((el) => { return {message: el.message, author: el.author_email } })
    result += '# Fixes\n\n'
    result += generateChanges('fix', changes)
    result += '\n# New features\n\n'
    result += generateChanges('feat', changes)
    result += '\n# Others\n\n'
    result += generateChanges('others', changes)
    const newChangelogFile = path.join(CHANGELOG_FOLDER, `${version}.md`)
    fs.writeFileSync(newChangelogFile, result)
    console.log("✅ Done!")
    console.log(`📄 Changelog is available at ${newChangelogFile}`)
}

main()
