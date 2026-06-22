// API Types
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const PostCard = ({ post }: { post?: Post }) => {
    if (!post) return null;

    return (
        <article
            className="w-full max-w-xl mx-auto bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 shadow-xl text-left"
        >
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{post.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">{post.body}</p>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs text-zinc-500">
                <span>Post ID: {post.id}</span>
                <span>User ID: {post.userId}</span>
            </div>
        </article>
    );
};