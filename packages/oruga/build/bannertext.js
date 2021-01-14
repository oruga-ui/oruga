const generate = function (version) {

    const preview_build = process.env.ORUGA_PREVIEW_BUILD

    if (preview_build) {
        version = `${version} (build ${preview_build})`
    }

    return `/*! Oruga v${version} | MIT License | github.com/oruga-ui/oruga */\n`
}

module.exports.generate = generate
