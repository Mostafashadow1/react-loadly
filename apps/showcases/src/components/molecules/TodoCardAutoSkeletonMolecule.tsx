
export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
// Component to display Todos
export const TodoList = ({ todos }: { todos?: Todo[] }) => {
    if (!todos || todos.length === 0) return null;

    return (
        <div className="w-full max-w-md mx-auto bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 shadow-xl text-left">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
                Tasks Checklist
            </h3>
            <ul className="space-y-2.5">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center gap-3 p-3 bg-zinc-950/40 border border-zinc-800/40 rounded-xl hover:border-zinc-700/60 transition"
                    >
                        <div
                            className={`flex items-center justify-center w-5 h-5 rounded-md border text-[10px] shrink-0 font-bold transition-all ${
                                todo.completed
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                    : "border-zinc-700 text-transparent"
                            }`}
                        >
                            ✓
                        </div>
                        <span
                            className={`flex-1 text-sm truncate ${
                                todo.completed ? "line-through text-zinc-500" : "text-zinc-200"
                            }`}
                        >
                            {todo.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
