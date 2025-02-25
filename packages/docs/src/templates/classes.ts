export function renderer(name: string): string {
    name = name.toLowerCase();
    return `
## Class Inspector

<inspector-${name}-viewer />
`;
}

export default renderer;
