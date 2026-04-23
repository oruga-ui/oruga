export function renderer(name: string): string {
    return `
## Class Inspector

<inspector-${name.toLowerCase()} />
`;
}

export default renderer;
