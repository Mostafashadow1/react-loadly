import { useEffect, useState, type ReactNode } from "react";
import { Skeletonize } from "react-loadly";
import { Bell, CheckCircle2, MessageSquare, RefreshCw, Star, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const darkTheme = { baseColor: "#27272a", highlightColor: "#3f3f46" };

type User = { name: string; role: string; avatar: string };
type Product = { title: string; price: string; rating: number; image: string };
type Order = { id: string; customer: string; total: string; status: string };

const placeholderUser: User = { name: "Loading name", role: "Loading role", avatar: "" };
const realUser: User = {
  name: "Jane Doe",
  role: "Product Designer at Acme",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop",
};

const placeholderProduct: Product = { title: "Product title here", price: "$00.00", rating: 5, image: "" };
const realProduct: Product = {
  title: "Runner Pro sneakers",
  price: "$129.00",
  rating: 4,
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=640&h=400&fit=crop",
};

const placeholderOrders: Order[] = Array.from({ length: 4 }, (_, i) => ({
  id: `#000${i}`,
  customer: "Customer name",
  total: "$000.00",
  status: "Status",
}));
const realOrders: Order[] = [
  { id: "#1042", customer: "Ada Lovelace", total: "$240.00", status: "Paid" },
  { id: "#1041", customer: "Alan Turing", total: "$89.50", status: "Pending" },
  { id: "#1040", customer: "Grace Hopper", total: "$1,120.00", status: "Paid" },
  { id: "#1039", customer: "Linus Torvalds", total: "$42.00", status: "Refunded" },
];

function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-3">
      <img src={user.avatar || undefined} alt="" className="size-12 shrink-0 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-semibold text-zinc-100">{user.name}</h4>
        <p className="truncate text-xs text-zinc-400">{user.role}</p>
      </div>
      <button type="button" className="rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white">
        Follow
      </button>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <img src={product.image || undefined} alt="" className="h-36 w-full rounded-lg object-cover" />
      <h4 className="mt-3 text-sm font-semibold text-zinc-100">{product.title}</h4>
      <div className="mt-1 flex items-center gap-1" aria-label={`${product.rating} of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`size-3.5 ${i < product.rating ? "fill-amber-400 text-amber-400" : "text-zinc-600"}`} />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-base font-bold text-zinc-100">{product.price}</span>
        <button type="button" className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200">
          Add to cart
        </button>
      </div>
    </div>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <table className="w-full text-left text-xs">
      <thead>
        <tr className="text-zinc-500">
          <th className="pb-2 font-medium">Order</th>
          <th className="pb-2 font-medium">Customer</th>
          <th className="pb-2 text-right font-medium">Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-t border-zinc-800">
            <td className="py-2 pr-2">
              <span className="text-zinc-300">{order.id}</span>
            </td>
            <td className="py-2 pr-2">
              <span className="text-zinc-100">{order.customer}</span>
            </td>
            <td className="py-2 text-right">
              <span className="text-zinc-100">{order.total}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SettingsForm({ email }: { email: string }) {
  return (
    <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
      <label className="block">
        <span className="mb-1 block text-xs text-zinc-400">Email</span>
        <input
          readOnly
          value={email}
          className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs text-zinc-400">Plan</span>
        <select className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100">
          <option>Pro, billed yearly</option>
        </select>
      </label>
      <button type="submit" className="w-full rounded-md bg-indigo-500 py-2 text-sm font-semibold text-white">
        Save changes
      </button>
    </form>
  );
}

function Notifications() {
  const items = [
    { icon: MessageSquare, title: "New comment on your post", time: "2m ago" },
    { icon: CheckCircle2, title: "Deployment finished", time: "1h ago" },
    { icon: Bell, title: "Weekly report is ready", time: "Yesterday" },
  ];
  return (
    <ul className="space-y-3">
      {items.map(({ icon: Icon, title, time }) => (
        <li key={title} className="flex items-center gap-3">
          <Icon className="size-8 shrink-0 rounded-md bg-zinc-800 p-1.5 text-indigo-300" />
          <div className="min-w-0">
            <p className="truncate text-sm text-zinc-100">{title}</p>
            <time className="text-xs text-zinc-500">{time}</time>
          </div>
        </li>
      ))}
    </ul>
  );
}

function useFakeFetch<T>(placeholder: T, data: T, delay = 1500) {
  const [state, setState] = useState<{ loading: boolean; value: T }>({ loading: true, value: placeholder });
  const [run, setRun] = useState(0);

  useEffect(() => {
    setState({ loading: true, value: placeholder });
    const timer = setTimeout(() => setState({ loading: false, value: data }), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return { ...state, refetch: () => setRun((value) => value + 1) };
}

function Example({
  title,
  code,
  onRefetch,
  children,
}: {
  title: string;
  code: string;
  onRefetch?: () => void;
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col rounded-lg border border-zinc-800/80 bg-zinc-950/50 p-5 shadow-lg shadow-black/10">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-100">{title}</h3>
        {onRefetch && (
          <button
            type="button"
            onClick={onRefetch}
            className="inline-flex items-center gap-1 rounded-md border border-zinc-800 px-2 py-1 text-[11px] text-zinc-400 hover:text-zinc-100"
          >
            <RefreshCw className="size-3" /> Refetch
          </button>
        )}
      </div>
      <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-4">{children}</div>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-900/80 p-3 text-[11px] leading-5 text-zinc-300">
        <code>{code}</code>
      </pre>
    </article>
  );
}

export function SkeletonizeExamples() {
  const [loading, setLoading] = useState(true);
  const user = useFakeFetch(placeholderUser, realUser);
  const product = useFakeFetch(placeholderProduct, realProduct, 2000);
  const orders = useFakeFetch(placeholderOrders, realOrders, 2500);

  return (
    <section id="skeletonize" className="relative border-t border-border/20 bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-200">
            <Wand2 className="size-3.5" />
            New in 3.1
          </div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Skeletonize: your real component is the skeleton
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Wrap any component and render it with placeholder data. While <code>loading</code> is true,
            text, images, icons and form controls turn into skeleton blocks with the exact size and position
            of the real UI. No second skeleton layout to keep in sync, and it works with hooks, context and
            Tailwind.
          </p>
        </div>

        <pre className="mx-auto mb-10 max-w-3xl overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/80 p-4 text-xs leading-6 text-zinc-300">
          <code>{`import { Skeletonize } from "react-loadly";

function Profile() {
  const { data, isLoading } = useQuery({ queryKey: ["user"], queryFn: getUser });

  return (
    <Skeletonize loading={isLoading}>
      <UserCard user={data ?? placeholderUser} />
    </Skeletonize>
  );
}`}</code>
        </pre>

        <div className="mb-6 flex justify-center">
          <Button
            onClick={() => setLoading((value) => !value)}
            className="h-9 rounded-lg bg-indigo-400 px-4 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            {loading ? "Show content" : "Show skeletons"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Example
            title="User card (simulated fetch)"
            onRefetch={user.refetch}
            code={`<Skeletonize loading={isLoading}>
  <UserCard user={data ?? placeholderUser} />
</Skeletonize>`}
          >
            <Skeletonize loading={user.loading} {...darkTheme}>
              <UserCard user={user.value} />
            </Skeletonize>
          </Example>

          <Example
            title="Product card (simulated fetch)"
            onRefetch={product.refetch}
            code={`<Skeletonize loading={isLoading}>
  <ProductCard product={data ?? placeholderProduct} />
</Skeletonize>`}
          >
            <Skeletonize loading={product.loading} {...darkTheme}>
              <ProductCard product={product.value} />
            </Skeletonize>
          </Example>

          <Example
            title="Table rows (simulated fetch)"
            onRefetch={orders.refetch}
            code={`<Skeletonize loading={isLoading}>
  <OrdersTable orders={data ?? placeholderOrders} />
</Skeletonize>`}
          >
            <Skeletonize loading={orders.loading} {...darkTheme}>
              <OrdersTable orders={orders.value} />
            </Skeletonize>
          </Example>

          <Example
            title="Form controls"
            code={`<Skeletonize loading={loading}>
  <SettingsForm email={user.email} />
</Skeletonize>`}
          >
            <Skeletonize loading={loading} {...darkTheme}>
              <SettingsForm email="jane@acme.com" />
            </Skeletonize>
          </Example>

          <Example
            title="Icons and lists, pulse animation"
            code={`<Skeletonize loading={loading} animation="pulse">
  <Notifications />
</Skeletonize>`}
          >
            <Skeletonize loading={loading} animation="pulse" {...darkTheme}>
              <Notifications />
            </Skeletonize>
          </Example>

          <Example
            title="Custom colors and speed"
            code={`<Skeletonize
  loading={loading}
  baseColor="#312e81"
  highlightColor="#4338ca"
  speed={1}
>
  <UserCard user={realUser} />
</Skeletonize>`}
          >
            <Skeletonize loading={loading} baseColor="#312e81" highlightColor="#4338ca" speed={1}>
              <UserCard user={realUser} />
            </Skeletonize>
          </Example>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-6 text-muted-foreground">
          While loading, the content is <code>inert</code> and <code>aria-hidden</code>, and screen readers hear
          one &quot;Loading&quot; status instead of the placeholder text. Add <code>data-skeleton</code> to any
          element that should also become a block.
        </p>
      </div>
    </section>
  );
}
