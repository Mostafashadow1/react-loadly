import CodeMirror from "@uiw/react-codemirror";

type CodeSnippetEditableMoleculeProps = {
    generatedCode: string;
    setGeneratedCode: (code: string) => void;
}
const CodeSnippetEditableMolecule = ({ generatedCode, setGeneratedCode }: CodeSnippetEditableMoleculeProps) => {
    return (
        <CodeMirror
            value={generatedCode}
            height="100%"
            theme="dark"
            onChange={(value) => setGeneratedCode(value)}
        />
    )
}

export default CodeSnippetEditableMolecule