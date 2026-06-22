// LoaderViewTabs.tsx
"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SwitchTabs({
    preview,
    code,
}: {
    preview: React.ReactNode;
    code: React.ReactNode;
}) {
    return (
        <Tabs defaultValue="preview" className="w-full flex flex-col h-full scrollbar-none">

            <TabsList className="bg-zinc-800/60 p-1 rounded-md w-fit border border-zinc-700 ">
                <TabsTrigger
                    value="preview"
                    className="
            data-[state=active]:bg-indigo-700 data-[state=active]:text-white
            text-zinc-400 hover:text-white hover:bg-indigo-700/40
            transition-all px-4 py-1 rounded-sm ease-in-out
          "
                >
                    Preview
                </TabsTrigger>

                <TabsTrigger
                    value="code"
                    className="
            data-[state=active]:bg-indigo-700 data-[state=active]:text-white
            text-zinc-400 hover:text-white hover:bg-indigo-700/40
            transition-all px-4 py-1 rounded-sm ease-in-out
          "
                >
                    Code
                </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 overflow-auto">
                {preview}
            </TabsContent>

            <TabsContent value="code" className="flex-1 overflow-auto">
                {code}
            </TabsContent>
        </Tabs>
    );
}
