export function renderer(name: string): string {
    return `
## Examples

${"<example-" + name.toLowerCase() + " />"}
`;
}

export default renderer;
