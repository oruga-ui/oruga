import { Directive, DirectiveHook } from "vue"

const findFocusable = (element: HTMLElement | Element, programmatic = false) => {
    if (!element) {
        return null
    }
    if (programmatic) {
        return element.querySelectorAll(`*[tabindex="-1"]`) as NodeListOf<HTMLElement>
    }
    return element.querySelectorAll(`a[href]:not([tabindex="-1"]),
                                     area[href],
                                     input:not([disabled]),
                                     select:not([disabled]),
                                     textarea:not([disabled]),
                                     button:not([disabled]),
                                     iframe,
                                     object,
                                     embed,
                                     *[tabindex]:not([tabindex="-1"]),
                                     *[contenteditable]`) as NodeListOf<HTMLElement>
}

let onKeyDown: (e: KeyboardEvent) => void

const bind: DirectiveHook<HTMLElement | Element, null, boolean> = (el, { value = true }) => {
    if (value) {
        let focusable = findFocusable(el)
        let focusableProg = findFocusable(el, true)

        if (focusable && focusable.length > 0) {
            onKeyDown = (event) => {
                // Need to get focusable each time since it can change between key events
                // ex. changing month in a datepicker
                focusable = findFocusable(el)
                focusableProg = findFocusable(el, true)
                const firstFocusable = focusable[0]
                const lastFocusable = focusable[focusable.length - 1]

                if (event.target === firstFocusable && event.shiftKey && event.key === 'Tab') {
                    event.preventDefault()
                    lastFocusable.focus()
                } else if ((event.target === lastFocusable || (event.target instanceof HTMLElement && Array.from(focusableProg).indexOf(event.target) >= 0)) && !event.shiftKey && event.key === 'Tab') {
                    event.preventDefault()
                    firstFocusable.focus()
                }
            }
            el.addEventListener('keydown', onKeyDown as EventListener)
        }
    }
}

const unbind: DirectiveHook<HTMLElement | Element, null, boolean> = (el) => {
    el.removeEventListener('keydown', onKeyDown as EventListener)
}

const directive: Directive<HTMLElement | Element, boolean> = {
    beforeMount: bind,
    beforeUnmount: unbind,
}

export default directive
