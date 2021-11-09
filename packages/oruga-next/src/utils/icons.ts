import { getOptions } from './config'
import { merge, getValueByPath } from './helpers'

const mdiIcons = {
    sizes: {
        'default': 'mdi-24px',
        'small': null,
        'medium': 'mdi-36px',
        'large': 'mdi-48px'
    },
    iconPrefix: 'mdi-'
}

const materialIcons = {
    sizes: {
        'default': null,
        'small': 'md-18',
        'medium': 'md-36p',
        'large': 'md-48p'
    },
    ligature: true
}

const faIcons = () => {
    const iconComponent = getValueByPath(getOptions(), 'iconComponent')
    const faIconPrefix = iconComponent ? '' : 'fa-'
    return {
        sizes: {
            'default': null,
            'small': null,
            'medium': faIconPrefix + 'lg',
            'large': faIconPrefix + '2x'
        },
        iconPrefix: faIconPrefix,
        internalIcons: {
            'check': 'check',
            'information': 'info-circle',
            'alert': 'exclamation-triangle',
            'alert-circle': 'exclamation-circle',
            'arrow-up': 'arrow-up',
            'chevron-right': 'angle-right',
            'chevron-left': 'angle-left',
            'chevron-down': 'angle-down',
            'chevron-up': 'angle-up',
            'eye': 'eye',
            'eye-off': 'eye-slash',
            'caret-down': 'caret-down',
            'caret-up': 'caret-up',
            'close-circle': 'times-circle',
            'loading': 'circle-notch'
        }
    }
}

const getIcons = () => {
    let icons = {
        mdi: mdiIcons,
        'material-icons': materialIcons,
        fa: faIcons(),
        fas: faIcons(),
        far: faIcons(),
        fad: faIcons(),
        fab: faIcons(),
        fal: faIcons()
    }

    const customIconPacks = getValueByPath(getOptions(), 'customIconPacks')
    if (customIconPacks) {
        icons = merge(icons, customIconPacks, true)
    }

    return icons
}

export default getIcons
