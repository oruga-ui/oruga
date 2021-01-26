const isTouch =
  typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0)
const events = isTouch ? ['touchstart', 'click'] : ['click']

const instances: any[] = []

function processArgs(bindingValue: any) {
    const isFunction = typeof bindingValue === 'function'
    if (!isFunction && typeof bindingValue !== 'object') {
        throw new Error(`v-click-outside: Binding value should be a function or an object, typeof ${bindingValue} given`)
    }

    return {
        handler: isFunction ? bindingValue : bindingValue.handler,
        middleware: bindingValue.middleware || ((isClickOutside: boolean) => isClickOutside),
        events: bindingValue.events || events
    }
}

function onEvent({ el, event, handler, middleware }: { el: any, event: any, handler: any, middleware: any }) {
    const isClickOutside = event.target !== el && !el.contains(event.target)

    if (!isClickOutside) {
        return
    }

    if (middleware(event, el)) {
        handler(event, el)
    }
}

function bind(el: any, { value }: { value: any}) {
    const { handler, middleware, events } = processArgs(value)

    const instance = {
        el,
        eventHandlers: events.map((eventName: string) => ({
            event: eventName,
            handler: (event: any) => onEvent({ event, el, handler, middleware })
        }))
    }

    instance.eventHandlers.forEach(({ event, handler }: { event: any, handler: any}) =>
        document.addEventListener(event, handler))
    instances.push(instance)
}

function update(el: any, { value }: { value: any }) {
    const { handler, middleware, events } = processArgs(value)
    // `filter` instead of `find` for compat with IE
    const instance = instances.filter((instance) => instance.el === el)[0]

    instance.eventHandlers.forEach(({ event, handler }: { event: any, handler: any}) =>
        document.removeEventListener(event, handler)
    )

    instance.eventHandlers = events.map((eventName: string) => ({
        event: eventName,
        handler: (event: any) => onEvent({ event, el, handler, middleware })
    }))

    instance.eventHandlers.forEach(({ event, handler }: { event: any, handler: any}) =>
        document.addEventListener(event, handler))
}

function unbind(el: any) {
    // `filter` instead of `find` for compat with IE
    const instance = instances.filter((instance) => instance.el === el)[0]
    instance.eventHandlers.forEach(({ event, handler }: { event: any, handler: any}) =>
        document.removeEventListener(event, handler)
    )
}

const directive = {
    beforeMount: bind,
    beforeUpdate: update,
    beforeUnmount: unbind,
    instances
}

export default directive
