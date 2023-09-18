export default {
    methods: {
        manageKeydown(event, weekDay) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event;
            let preventDefault = true;
            switch (key) {
                case "Tab": {
                    preventDefault = false;
                    break;
                }
                case " ":
                case "Space":
                case "Spacebar":
                case "Enter": {
                    this.emitChosenDate(weekDay);
                    break;
                }

                case "ArrowLeft":
                case "Left": {
                    this.changeFocus(weekDay, -1);
                    break;
                }
                case "ArrowRight":
                case "Right": {
                    this.changeFocus(weekDay, 1);
                    break;
                }
                case "ArrowUp":
                case "Up": {
                    this.changeFocus(weekDay, -7);
                    break;
                }
                case "ArrowDown":
                case "Down": {
                    this.changeFocus(weekDay, 7);
                    break;
                }
            }
            if (preventDefault) {
                event.preventDefault();
            }
        },
    },
};
