import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import CodeSnippetEditableMolecule from "../molecules/CodeSnippetEditableMolecule";

interface CodeSnippetProps {
  activeLoaderData: any;
  currentProps: Record<string, any>;
}

export function CodeSnippet({ activeLoaderData, currentProps }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  useEffect(() => {
    setGeneratedCode(generateCodeSnippet());
    ;
  }, [currentProps, activeLoaderData]);

  const generateCodeSnippet = () => {
    const loaderName = activeLoaderData.title.replace(/\s+/g, "");
    // pull children out so we can handle it separately
    const { children, ...propsWithoutChildren } = currentProps;
    // build props string
    const propsString = Object.entries(propsWithoutChildren)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `      ${key}="${value}"`;
        }
        return `      ${key}={${JSON.stringify(value)}}`;
      })
      .join("\n");

    // CASES1:

    if (children) {

      return `import { ${loaderName} } from 'react-loadly';

function MyComponent() {
  return (
    <${loaderName}
${propsString}
 children ={${children}}
    />
  );
}`} else {
      return `import { ${loaderName} } from 'react-loadly';

function MyComponent() {
  return (
    <${loaderName}
${propsString}
    />
  );
}`
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3 shrink-0">
        <h4 className="font-semibold text-gray-200 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Implementation
        </h4>
        <Button
          onClick={copyToClipboard}
          size="sm"
          variant="outline"
          className="gap-2 hover:bg-green-500/10"
        >
          <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* Editor Container */}
      <div className="flex-1 min-h-0 rounded-lg border border-gray-800 bg-zinc-950 overflow-hidden text-sm">
        <CodeSnippetEditableMolecule generatedCode={generatedCode} setGeneratedCode={setGeneratedCode} />
      </div>

      {/* Interface Documentation */}
      <div className="mt-3 p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20 shrink-0">
        <h5 className="text-sm font-semibold text-indigo-300 mb-1">
          Interface: {activeLoaderData.interface}
        </h5>
        <div className="text-xs text-gray-400 space-y-0.5">
          <div>Common: {activeLoaderData.commonProps.join(", ")}</div>
          {activeLoaderData.uniqueProps.length > 0 && (
            <div>Unique: {activeLoaderData.uniqueProps.join(", ")}</div>
          )}
        </div>
      </div>
    </div>
  );
}