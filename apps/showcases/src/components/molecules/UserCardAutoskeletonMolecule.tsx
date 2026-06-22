export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}
// Component to display a User
export const UserProfile = ({ user }: { user?: User }) => {
    if (!user) return null;

    return (
        <div
            className="w-full max-w-sm mx-auto bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 shadow-xl text-left"
        >
            <div className="flex items-center gap-4 mb-4">
                <div
                    className="w-14 h-14 rounded-full bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xl font-bold shrink-0 shadow-inner"
                >
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{user.name}</h3>
                    <p className="text-zinc-500 text-xs mt-0.5">@{user.username}</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800/60 space-y-2 text-xs sm:text-sm">
                <p className="flex justify-between text-zinc-400">
                    <span className="text-zinc-500 font-medium">Email:</span> 
                    <span className="text-zinc-200 truncate ml-2">{user.email}</span>
                </p>
                <p className="flex justify-between text-zinc-400">
                    <span className="text-zinc-500 font-medium">Phone:</span> 
                    <span className="text-zinc-200 truncate ml-2">{user.phone}</span>
                </p>
                <p className="flex justify-between text-zinc-400">
                    <span className="text-zinc-500 font-medium">Website:</span> 
                    <span className="text-zinc-200 truncate ml-2">{user.website}</span>
                </p>
            </div>
        </div>
    );
};
