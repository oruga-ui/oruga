export function renderer(name: string): string {
    name = name.toLowerCase();
    return `
## Class props

<inspector-${name}-viewer />
`;
}

export default renderer;
