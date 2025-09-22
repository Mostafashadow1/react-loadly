import { AutoSkeletonLoader } from "@/components/organisms";
import React, { useState } from "react";

// Example Card Component
const ProductCard = ({ product }: { product: any }) => (
  <div className="w-full max-w-sm">
    <div>
      <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-muted-foreground mb-4">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">${product.price}</span>
        <span className="text-sm text-muted-foreground">{product.category}</span>
      </div>
    </div>
    <div>
      <button className="w-full">Add to Cart</button>
    </div>
  </div>
);

// User Profile Component
const UserProfile = ({ user }: { user: any }) => (
  <div className="flex items-center space-x-4 p-4">
    {/* <img src={user.avatar} alt={user.name} style={{ width: "64px", height: "64px", borderRadius: "50%" }} /> */}
    <div>
      <h4 className="text-lg font-semibold">{user.name}</h4>
      <p className="text-muted-foreground">{user.email}</p>
      <span className="text-sm text-muted-foreground">{user.role}</span>
    </div>
  </div>
);

// Article Component
const Article = ({ article }: { article: any }) => (
  <article className="space-y-4">
    <header>
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <div className="flex items-center space-x-2 text-muted-foreground mt-2">
        <span>By {article.author}</span>
        <span>•</span>
        <span>{article.date}</span>
      </div>
    </header>
    <img src={article.featuredImage} alt={article.title} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }} />
    <div className="prose">
      <p>{article.excerpt}</p>
      <p>{article.content}</p>
    </div>
    <footer>
      <div className="flex space-x-2">
        {article.tags.map((tag: string, index: number) => (
          <span key={index} className="px-2 py-1 bg-muted text-muted-foreground rounded text-sm">
            {tag}
          </span>
        ))}
      </div>
    </footer>
  </article>
);

// Navigation Component
const Navigation = () => (
  <nav className="flex items-center justify-between p-4 border-b">
    <div className="flex items-center space-x-4">
      <img src="/logo.png" alt="Logo" style={{ width: "40px", height: "40px" }} />
      <h2 className="text-xl font-semibold">My App</h2>
    </div>
    <div className="flex items-center space-x-4">
      <button>Home</button>
      <button>About</button>
      <button>Contact</button>
      <button>Sign In</button>
    </div>
  </nav>
);

// Main Example Component
export const AutoSkeletonExample = () => {
  const [loadingStates, setLoadingStates] = useState({
    product: true,
    user: true,
    article: true,
    navigation: true,
  });

  const sampleData = {
    product: {
      name: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 299,
      category: "Electronics",
      image: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/396e9/MainAfter.jpg",
    },
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Software Engineer",
      avatar: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/396e9/MainAfter.jpg",
    },
    article: {
      title: "Getting Started with React Skeleton Loaders",
      author: "Jane Smith",
      date: "Dec 15, 2024",
      excerpt: "Learn how to implement beautiful skeleton loading states in your React applications.",
      content: "Skeleton loaders are a great way to improve perceived performance and user experience while content is loading.",
      featuredImage: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/396e9/MainAfter.jpg",
      tags: ["React", "UI/UX", "Performance"],
    },
  };

  const toggleLoading = (key: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">AutoSkeletonLoader Examples</h1>
        <p className="text-muted-foreground">Explore different use cases and configurations of the AutoSkeletonLoader component</p>
      </div>

      {/* Example 1: Basic Product Card */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Product Card</h2>
          <button onClick={() => toggleLoading("product")}>{loadingStates.product ? "Show Content" : "Show Skeleton"}</button>
        </div>
        <div className="flex">
          <AutoSkeletonLoader loading={loadingStates.product} component={<ProductCard product={sampleData.product} />} inheritStyles />
        </div>
      </section>

      {/* Example 2: User Profile with Style Inheritance */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">User Profile (Style Inheritance)</h2>
          <button onClick={() => toggleLoading("user")}>{loadingStates.user ? "Show Content" : "Show Skeleton"}</button>
        </div>
        <AutoSkeletonLoader loading={loadingStates.user} component={<UserProfile user={sampleData.user} />} inheritStyles />
      </section>

      {/* Example 3: Article with Custom ClassNames */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Article (Custom Styling)</h2>
          <button onClick={() => toggleLoading("article")}>{loadingStates.article ? "Show Content" : "Show Skeleton"}</button>
        </div>
        <AutoSkeletonLoader
          loading={loadingStates.article}
          component={<Article article={sampleData.article} />}
          styless={{
            h1: { height: "3.5em", width: "90%" },
            span: { height: "1em", width: "60%" },
            img: { borderRadius: "12px", width: "60%" },
            p: { height: "1.2em", width: "95%" },
          }}
        />
      </section>

      {/* Example 4: Navigation with Shimmer Effect */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Navigation (Custom Shimmer)</h2>
          <button onClick={() => toggleLoading("navigation")}>{loadingStates.navigation ? "Show Content" : "Show Skeleton"}</button>
        </div>
        <AutoSkeletonLoader loading={loadingStates.navigation} component={<Navigation />} shimmer={true} waveDirection="right-to-left" />
      </section>

      {/* Example 5: Complex Component with Multiple Children */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Complex Component Example</h2>
        <AutoSkeletonLoader
          loading={true}
          component={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard product={sampleData.product} />
              <ProductCard product={sampleData.product} />
              <ProductCard product={sampleData.product} />
            </div>
          }
        />
      </section>

      {/* Controls */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Global Controls</h2>
        <div className="flex justify-center space-x-4">
          <button onClick={() => setLoadingStates({ product: true, user: true, article: true, navigation: true })}>Show All Skeletons</button>
          <button onClick={() => setLoadingStates({ product: false, user: false, article: false, navigation: false })}>Show All Content</button>
        </div>
      </section>
    </div>
  );
};
