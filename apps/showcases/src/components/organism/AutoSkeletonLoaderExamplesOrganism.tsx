"use client";

import { AutoSkeletonLoader } from "react-loadly";
import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FlaskConical,
  RefreshCw,
  Copy,
  Check,
  CheckCircle,
  XCircle,
  Code,
} from "lucide-react";
import { PostCard, type Post } from "../molecules/PostCardAutoSkeletonMolecule";
import {
  UserProfile,
  type User,
} from "../molecules/UserCardAutoskeletonMolecule";
import { TodoList, type Todo } from "../molecules/TodoCardAutoSkeletonMolecule";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

interface UserProfileData {
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
}
interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}
interface ArticleData {
  title: string;
  author: string;
  date: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
}

function CopySnippetButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  }
  return (
    <button
      onClick={onCopy}
      aria-label="Copy snippet"
      className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850 hover:text-white transition w-full sm:w-auto"
    >
      {copied ? (
        <>
          <Check className="size-3 text-emerald-400" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="size-3" />
          <span>Copy Snippet</span>
        </>
      )}
    </button>
  );
}

const ProfileCard = ({ user }: { user: UserProfileData }) => (
  <Card className="w-full max-w-sm mx-auto bg-zinc-900/40 border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl">
    <CardContent className="p-6 text-center">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="space-y-4"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="rounded-full w-24 h-24 object-cover mx-auto border-4 border-zinc-800/80 shadow-md"
        />
        <h3 className="text-xl font-bold text-white">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.role}</p>
        <p className="text-xs text-zinc-500">{user.email}</p>
        <Badge className="mt-3 bg-indigo-500/10 border-indigo-500/20 text-indigo-300 shadow-sm">
          {user.status}
        </Badge>
      </motion.div>
    </CardContent>
  </Card>
);

const ProductCard = ({ product }: { product: ProductData }) => (
  <Card className="w-full max-w-sm mx-auto bg-zinc-900/40 border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <Badge className="absolute top-3 right-3 bg-zinc-900/80 border border-zinc-800 text-zinc-200 shadow">
          {product.category}
        </Badge>
      </div>

      <CardHeader className="p-5">
        <CardTitle className="text-lg font-bold text-white">
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs text-zinc-400 mt-1">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-4 flex items-center justify-between">
        <span className="text-xl font-extrabold text-indigo-400">
          ${product.price}
        </span>
        <div className="flex items-center space-x-1 text-amber-400 text-sm">
          <span>★</span>
          <span className="font-semibold">{product.rating}</span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-5 font-semibold transition-all">
          Add to Cart
        </Button>
      </CardFooter>
    </motion.div>
  </Card>
);

const ArticleCard = ({ article }: { article: ArticleData }) => (
  <Card className="w-full max-w-xl mx-auto bg-zinc-900/40 border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <img
        src={article.featuredImage}
        alt={article.title}
        className="w-full h-44 object-cover rounded-t-2xl"
      />
      <CardHeader className="p-5">
        <CardTitle className="text-lg font-bold text-white">
          {article.title}
        </CardTitle>
        <CardDescription className="text-xs text-zinc-400 mt-1">
          By {article.author} • {article.date}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-0">
        <p className="text-sm text-zinc-300 leading-relaxed">
          {article.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 4).map((t, i) => (
            <Badge
              key={i}
              className="bg-indigo-500/10 border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20"
            >
              #{t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </motion.div>
  </Card>
);

const SidebarExample = () => (
  <aside className="w-full max-w-xs mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-xl">
    <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
      <div className="size-10 rounded-xl bg-indigo-500" />
      <div>
        <h3 className="text-sm font-bold text-white">Loadly OS</h3>
        <p className="text-xs text-zinc-500">Workspace</p>
      </div>
    </div>
    <nav className="space-y-2 py-4">
      {["Dashboard", "Projects", "Analytics", "Settings"].map((item, index) => (
        <div key={item} className={`flex items-center gap-3 rounded-xl px-3 py-2 ${index === 0 ? "bg-indigo-500/15 text-indigo-300" : "text-zinc-400"}`}>
          <div className="size-3 rounded-full bg-current" />
          <span className="text-sm font-medium">{item}</span>
        </div>
      ))}
    </nav>
    <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
      <div className="size-9 rounded-full bg-zinc-700" />
      <div>
        <p className="text-sm font-semibold text-white">Mona Lee</p>
        <p className="text-xs text-zinc-500">Product Lead</p>
      </div>
    </div>
  </aside>
);

const DashboardMetricCard = () => (
  <Card className="w-full max-w-md mx-auto rounded-2xl border-zinc-800 bg-zinc-900/50 p-5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-zinc-500">Monthly revenue</p>
        <h3 className="mt-2 text-3xl font-extrabold text-white">$48.2k</h3>
      </div>
      <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20">+12.8%</Badge>
    </div>
    <div className="mt-6 grid h-28 grid-cols-7 items-end gap-2">
      {[42, 64, 38, 80, 56, 92, 72].map((height, index) => (
        <div key={index} className="rounded-t-lg bg-indigo-500/70" style={{ height: `${height}%` }} />
      ))}
    </div>
  </Card>
);

const SettingsFormCard = () => (
  <Card className="w-full max-w-md mx-auto rounded-2xl border-zinc-800 bg-zinc-900/50 p-5">
    <CardHeader className="p-0">
      <CardTitle className="text-lg text-white">Notification Settings</CardTitle>
      <CardDescription>Control product and security updates.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 p-0 pt-5">
      <label className="block">
        <span className="text-xs font-semibold text-zinc-400">Email</span>
        <input className="mt-2 h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 text-sm text-white" value="team@loadly.dev" readOnly />
      </label>
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 p-3">
        <span className="text-sm text-zinc-300">Weekly report</span>
        <div className="h-6 w-11 rounded-full bg-indigo-500 p-1">
          <div className="size-4 rounded-full bg-white ml-auto" />
        </div>
      </div>
      <Button className="w-full rounded-xl bg-indigo-600 text-white">Save Settings</Button>
    </CardContent>
  </Card>
);

const dummyPost: Post = {
  id: 1,
  userId: 1,
  title: "Experimental AutoSkeleton Rendering in React Loadly",
  body: "AutoSkeleton remains available as a best-effort runtime skeleton generator while the next compiler-assisted architecture is under development.",
};

const dummyUser: User = {
  id: 1,
  name: "Alex Rivera",
  username: "alexrivera",
  email: "alex.rivera@designops.dev",
  phone: "+1 (555) 019-2834",
  website: "riveradesign.io",
};

const dummyTodos: Todo[] = [
  {
    id: 1,
    userId: 1,
    title: "Optimize skeleton rendering with WeakMap caching",
    completed: true,
  },
  {
    id: 2,
    userId: 1,
    title: "Resolve layout shifts using modern CSS containment properties",
    completed: true,
  },
  {
    id: 3,
    userId: 1,
    title: "Add subpath exports for tree-shaking support",
    completed: false,
  },
  {
    id: 4,
    userId: 1,
    title: "Implement fully accessible WAI-ARIA loading states",
    completed: false,
  },
];

export const AutoSkeletonLoaderExamples = () => {
  const [loadingStates, setLoadingStates] = useState({
    profile: true,
    product: true,
    article: true,
    sidebar: true,
    dashboard: true,
    settings: true,
    posts: true,
    users: true,
    todos: true,
  });

  const [postsData, setPostsData] = useState<Post[] | null>(null);
  const [usersData, setUsersData] = useState<User[] | null>(null);
  const [todosData, setTodosData] = useState<Todo[] | null>(null);

  const sampleData = {
    profile: {
      name: "Mostafa Mohamed",
      email: "info@shadowcoding.com",
      role: "Senior Frontend Engineer",
      avatar: "/Users/mac/react-loadly/apps/showcases/src/assets/me.JPG",
      status: "Online",
    },
    product: {
      name: "Wireless Headphones",
      description: "Premium noise-cancelling headphones with 30hr battery life",
      price: 199.99,
      category: "Electronics",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    },
    article: {
      title: "Shadow Coding",
      author: "Mostafa Mohamed",
      date: "Sept 20, 2023",
      excerpt:
        "Master JavaScript, React, and Next.js to become a senior frontend developer with advanced skills and best practices.",
      featuredImage:
        "https://media.licdn.com/dms/image/v2/D4D16AQH6bOSdADAqZA/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1715072501673?e=1761177600&v=beta&t=2JST07HT0bvLjhpp_EaKuoGNsrMb44ADJuOCgf5ncF0",
      tags: [
        "React",
        "Frontend",
        "Design Patterns",
        "javascript",
        "typescript",
      ],
    },
  };

  const toggleLoading = (key: keyof typeof loadingStates) => {
    setLoadingStates((p) => ({ ...p, [key]: !p[key] }));
  };

  const resetLoading = async (key: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }));
    try {
      if (key === "posts") {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
        );
        const data = await response.json();
        setPostsData(data);
      } else if (key === "users") {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users?_limit=3",
        );
        const data = await response.json();
        setUsersData(data);
      } else if (key === "todos") {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5",
        );
        const data = await response.json();
        setTodosData(data);
      }
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    } finally {
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 1500);
    }
  };

  const usageSnippet = `<AutoSkeletonLoader
  loading={isLoading}
  inheritStyles
  shimmer
  shimmerColor="rgba(255,255,255,0.06)"
  highlightColor="rgba(255,255,255,0.02)"
  component={<YourComponent />}
/>`;

  return (
    <section
      id="playground"
      className="relative py-24 bg-background overflow-hidden border-t border-border/20"
    >
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <FlaskConical className="size-3.5" />
            <span>Experimental Feature</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AutoSkeletonLoader Experimental Playground
          </h2>
          <p className="mt-4 text-muted-foreground">
            AutoSkeletonLoader remains available for experimentation and
            backward compatibility. Results may vary depending on component
            structure. For production use, prefer SkeletonLoader and SkeletonGroup.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Block - Live Interactive Skeletons */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="profile" className="w-full">
              {/* Tab Selector */}
              <div className="bg-zinc-950/60 border border-zinc-800 p-1.5 rounded-xl mb-6">
                <TabsList className="grid grid-cols-3 sm:grid-cols-9 gap-1 bg-transparent w-full">
                  <TabsTrigger
                    value="profile"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="product"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Product
                  </TabsTrigger>
                  <TabsTrigger
                    value="article"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Article
                  </TabsTrigger>
                  <TabsTrigger
                    value="sidebar"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Sidebar
                  </TabsTrigger>
                  <TabsTrigger
                    value="dashboard"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Metric
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Form
                  </TabsTrigger>
                  <TabsTrigger
                    value="posts"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Post (API)
                  </TabsTrigger>
                  <TabsTrigger
                    value="users"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    User (API)
                  </TabsTrigger>
                  <TabsTrigger
                    value="todos"
                    className="text-xs py-2 rounded-lg data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-zinc-800 transition text-muted-foreground hover:text-foreground"
                  >
                    Todos (API)
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Profile Card Tab */}
              <TabsContent
                value="profile"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Profile Card Demo
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Cloning typography, spacing, and avatar shapes
                        automatically.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => toggleLoading("profile")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 h-9"
                    >
                      {loadingStates.profile
                        ? "Reveal Content"
                        : "Trigger Skeleton"}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-sm">
                      <AutoSkeletonLoader
                        inheritStyles
                        loading={loadingStates.profile}
                        component={<ProfileCard user={sampleData.profile} />}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Product Card Tab */}
              <TabsContent
                value="product"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Product Card Demo
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Handles grid images, badges, and button bounds
                        automatically.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => toggleLoading("product")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 h-9"
                    >
                      {loadingStates.product
                        ? "Reveal Content"
                        : "Trigger Skeleton"}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-sm">
                      <AutoSkeletonLoader
                        inheritStyles
                        loading={loadingStates.product}
                        component={<ProductCard product={sampleData.product} />}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Article Card Tab */}
              <TabsContent
                value="article"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Article Preview Card
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Clones multi-line texts and tag badges layout
                        structures.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => toggleLoading("article")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 h-9"
                    >
                      {loadingStates.article
                        ? "Reveal Content"
                        : "Trigger Skeleton"}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-xl">
                      <AutoSkeletonLoader
                        inheritStyles
                        loading={loadingStates.article}
                        component={<ArticleCard article={sampleData.article} />}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="sidebar"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Sidebar Navigation
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Logo blocks, navigation rows, active item, and user footer.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => toggleLoading("sidebar")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 h-9"
                    >
                      {loadingStates.sidebar ? "Reveal Content" : "Trigger Skeleton"}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-xs">
                      <AutoSkeletonLoader inheritStyles loading={loadingStates.sidebar} component={<SidebarExample />} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="dashboard"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Dashboard Metric
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Metric title, value, trend badge, and chart bars.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => toggleLoading("dashboard")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 h-9"
                    >
                      {loadingStates.dashboard ? "Reveal Content" : "Trigger Skeleton"}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-md">
                      <AutoSkeletonLoader inheritStyles loading={loadingStates.dashboard} component={<DashboardMetricCard />} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="settings"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        Settings Form
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Labels, input bounds, toggle shape, and submit button.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => toggleLoading("settings")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 h-9"
                    >
                      {loadingStates.settings ? "Reveal Content" : "Trigger Skeleton"}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-md">
                      <AutoSkeletonLoader inheritStyles loading={loadingStates.settings} component={<SettingsFormCard />} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Posts API Tab */}
              <TabsContent
                value="posts"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        JSONPlaceholder Post Card
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Cloning structure during dynamic live REST fetch calls.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => resetLoading("posts")}
                      className="bg-indigo-650 hover:bg-indigo-550 border border-indigo-600 text-white rounded-lg text-xs font-semibold px-4 h-9 flex items-center gap-1.5"
                    >
                      <RefreshCw className="size-3.5" />
                      <span>Reload API</span>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-xl">
                      <AutoSkeletonLoader
                        loading={loadingStates.posts || !postsData}
                        component={
                          <PostCard post={postsData?.[0] || dummyPost} />
                        }
                        inheritStyles
                        shimmer
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users API Tab */}
              <TabsContent
                value="users"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        API User Profile Card
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Auto-scanning layout nodes during live user profiles
                        loads.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => resetLoading("users")}
                      className="bg-indigo-650 hover:bg-indigo-550 border border-indigo-600 text-white rounded-lg text-xs font-semibold px-4 h-9 flex items-center gap-1.5"
                    >
                      <RefreshCw className="size-3.5" />
                      <span>Reload API</span>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-xl">
                      <AutoSkeletonLoader
                        loading={loadingStates.users || !usersData}
                        component={
                          <UserProfile user={usersData?.[0] || dummyUser} />
                        }
                        inheritStyles
                        shimmer
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Todos API Tab */}
              <TabsContent
                value="todos"
                className="mt-0 focus-visible:outline-none"
              >
                <Card className="bg-card/40 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-border/20">
                    <div>
                      <CardTitle className="text-lg font-bold">
                        API Todo List Demo
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        Live list elements auto-converted to structural
                        skeletons.
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => resetLoading("todos")}
                      className="bg-indigo-650 hover:bg-indigo-550 border border-indigo-600 text-white rounded-lg text-xs font-semibold px-4 h-9 flex items-center gap-1.5"
                    >
                      <RefreshCw className="size-3.5" />
                      <span>Reload API</span>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 flex justify-center bg-zinc-950/20">
                    <div className="w-full max-w-xl">
                      <AutoSkeletonLoader
                        loading={loadingStates.todos || !todosData}
                        component={<TodoList todos={todosData || dummyTodos} />}
                        inheritStyles
                        shimmer
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Block - Quick Setup & Config Options */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <Card className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 bg-zinc-900 border-b border-border/20 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Code className="size-4 text-indigo-400" />
                    Quick Usage Code
                  </h3>
                  <CopySnippetButton text={usageSnippet} />
                </div>

                {/* Code Block */}
                <CardContent className="p-5 font-mono text-[11px] sm:text-xs leading-relaxed text-zinc-300">
                  <pre className="bg-zinc-950/90 p-4 rounded-xl border border-zinc-800/60 text-zinc-200 overflow-x-auto">
                    <div>
                      <span className="text-purple-400">import</span>{" "}
                      <span className="text-zinc-100">
                        {"{ AutoSkeletonLoader }"}
                      </span>{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-emerald-300">"react-loadly"</span>
                      <span className="text-zinc-400">;</span>
                    </div>
                    <div className="mt-3 text-zinc-400">
                      &lt;
                      <span className="text-indigo-400">
                        AutoSkeletonLoader
                      </span>
                    </div>
                    <div className="pl-4 text-zinc-300">
                      loading=
                      <span className="text-pink-400">{"{isLoading}"}</span>
                    </div>
                    <div className="pl-4 text-zinc-300">inheritStyles</div>
                    <div className="pl-4 text-zinc-300">shimmer</div>
                    <div className="pl-4 text-zinc-300">
                      shimmerColor=
                      <span className="text-emerald-300">
                        "rgba(255,255,255,0.06)"
                      </span>
                    </div>
                    <div className="pl-4 text-zinc-300">
                      highlightColor=
                      <span className="text-emerald-300">
                        "rgba(255,255,255,0.02)"
                      </span>
                    </div>
                    <div className="pl-4 text-zinc-300">
                      component=
                      <span className="text-pink-400">{"{<YourCard />}"}</span>
                    </div>
                    <div className="text-zinc-400">/&gt;</div>
                  </pre>

                  {/* Feature description highlights */}
                  <div className="mt-5 space-y-3.5 text-xs text-muted-foreground border-t border-border/20 pt-5">
                    <div className="flex items-start gap-2.5">
                      <div className="size-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <p>
                        <strong className="text-zinc-300">
                          Automatic styling clone:
                        </strong>{" "}
                        If{" "}
                        <code className="text-indigo-400 bg-indigo-400/5 px-1 rounded">
                          inheritStyles
                        </code>{" "}
                        is active, text alignments, padding, height bounds, and
                        circular borders are dynamically mapped.
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="size-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <p>
                        <strong className="text-zinc-300">
                          WeakMap Cache:
                        </strong>{" "}
                        Cloned DOM mappings are cached using WeakMap references
                        to guarantee 0ms overhead on re-renders.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="mt-20">
          <Card className="rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="p-6 border-b border-border/20">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <CheckCircle className="size-5 text-indigo-400" />
                AutoSkeletonLoader vs Manual Skeletons
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Comparing implementation complexity, code size, maintenance
                overhead, and rendering optimization.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-900/60 border-b border-border/20 text-muted-foreground font-semibold">
                    <th className="p-4 pl-6">Feature Details</th>
                    <th className="p-4 text-emerald-400 bg-emerald-500/5 border-x border-border/20">
                      AutoSkeletonLoader
                    </th>
                    <th className="p-4 pl-6 text-zinc-400">
                      Manual Skeleton Coding
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">Code Complexity</td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="size-4 text-emerald-400 shrink-0" />
                        <span>Single Component Wrapper</span>
                      </div>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <XCircle className="size-4 text-rose-500 shrink-0" />
                        <span>
                          Write 50+ lines of raw Tailwind skeleton files
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">Styling Sync</td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>Automatic CSS inherit styling</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>
                        Manual margin/padding alignment synchronization
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">
                      Maintenance Overhead
                    </td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>Zero. Updates with component tree change</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>
                        High. Sync required when cards UI/styles update
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">
                      Performance Optimization
                    </td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>WeakMap Cache + CSS containment auto</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>
                        Manual rendering overrides, risk of layout shifts
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-900/10">
                    <td className="p-4 pl-6 font-semibold">
                      Responsive Behavior
                    </td>
                    <td className="p-4 bg-emerald-500/5 border-x border-border/20 text-foreground font-medium">
                      <span>Inherits breakpoints automatically</span>
                    </td>
                    <td className="p-4 pl-6 text-muted-foreground">
                      <span>Duplicate responsive breakpoints in skeleton</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
