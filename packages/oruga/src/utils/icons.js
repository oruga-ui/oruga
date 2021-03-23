import { merge, getValueByPath } from '../utils/helpers'
import { getOptions } from './config'

const mdiIcons = {
    sizes: {
        'default': 'mdi-24px',
        'small': null,
        'medium': 'mdi-36px',
        'large': 'mdi-48px'
    },
    iconPrefix: 'mdi-'
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
            'information': 'info-circle',
            'alert': 'exclamation-triangle',
            'alert-circle': 'exclamation-circle',
            'chevron-right': 'angle-right',
            'chevron-left': 'angle-left',
            'chevron-down': 'angle-down',
            'chevron-up': 'angle-up',
            'eye-off': 'eye-slash',
            'caret-down': 'caret-down',
            'caret-up': 'caret-up',
            'close-circle': 'times-circle',
            'spin': 'circle-notch'
        }
    }
}

const getIcons = () => {
    let icons = {
        mdi: mdiIcons,
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
