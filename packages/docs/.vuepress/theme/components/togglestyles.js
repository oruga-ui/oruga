export default (value, immediate = false) => {
    setTimeout(() => {
        // switch style
        if (value) {
            let style = document.getElementById('orugacss-lite')
            let styleToRemove = document.getElementById('orugacss')
            style = document.createElement('link')
            style.id = 'orugacss-lite'
            style.type = "text/css"
            style.rel = "stylesheet"
            style.href = `${location.origin}/cdn/oruga.min.css`
            document.head.appendChild(style)
            setTimeout(() => {
                if (styleToRemove) document.head.removeChild(styleToRemove)
            }, 100);
        } else {
            let style = document.getElementById('orugacss')
            let styleToRemove = document.getElementById('orugacss-lite')
            style = document.createElement('link')
            style.id = 'orugacss'
            style.type = "text/css"
            style.rel = "stylesheet"
            style.href = `${location.origin}/cdn/oruga-full-vars.min.css`
            document.head.appendChild(style)
            setTimeout(() => {
                if (styleToRemove) document.head.removeChild(styleToRemove)
            }, 100);
        }
    }, immediate ? 0 : 250)
}
