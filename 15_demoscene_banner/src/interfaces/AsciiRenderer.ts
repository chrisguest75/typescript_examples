
export default interface AsciiRenderer {
    render(inFile: string, columns: number, rows: number): Promise<string>;
}