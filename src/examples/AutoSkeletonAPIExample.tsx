import React, { useState, useEffect } from "react";
import { AutoSkeletonLoader } from "@/components/organisms";

// API Types
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Component to display a Post
const PostCard = ({ post }: { post?: Post }) => {
  if (!post) return null;

  return (
    <article
      style={{
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>{post.title}</h1>
      <p style={{ color: "#6b7280", lineHeight: "1.6" }}>{post.body}</p>
      <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
        <span style={{ fontSize: "14px", color: "#9ca3af" }}>
          Post ID: {post.id} | User ID: {post.userId}
        </span>
      </div>
    </article>
  );
};

// Component to display a User
const UserProfile = ({ user }: { user?: User }) => {
  if (!user) return null;

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#3b82f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px" }}>{user.name}</h3>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>@{user.username}</p>
        </div>
      </div>
      <div style={{ marginTop: "16px" }}>
        <p style={{ marginBottom: "8px" }}>
          <strong>Email:</strong> {user.email}
        </p>
        <p style={{ marginBottom: "8px" }}>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p style={{ marginBottom: "8px" }}>
          <strong>Website:</strong> {user.website}
        </p>
      </div>
    </div>
  );
};

// Component to display Todos
const TodoList = ({ todos }: { todos?: Todo[] }) => {
  if (!todos || todos.length === 0) return null;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Todos</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              padding: "12px",
              marginBottom: "8px",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                borderRadius: "4px",
                backgroundColor: todo.completed ? "#10b981" : "#e5e7eb",
                border: "2px solid",
                borderColor: todo.completed ? "#10b981" : "#9ca3af",
              }}
            >
              {todo.completed && "✓"}
            </span>
            <span
              style={{
                flex: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#9ca3af" : "#1f2937",
              }}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const AutoSkeletonAPIExample = () => {
  const [loadingStates, setLoadingStates] = useState({
    posts: true,
    users: true,
    todos: true,
  });

  const [postsData, setPostsData] = useState<Post[] | null>(null);
  const [usersData, setUsersData] = useState<User[] | null>(null);
  const [todosData, setTodosData] = useState<Todo[] | null>(null);

  // Fetch posts from JSONPlaceholder
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await response.json();
        setPostsData(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, posts: false }));
      }
    };

    fetchPosts();
  }, []);

  // Fetch users from JSONPlaceholder
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=1");
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, users: false }));
      }
    };

    fetchUsers();
  }, []);

  // Fetch todos from JSONPlaceholder
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const data = await response.json();
        setTodosData(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoadingStates((prev) => ({ ...prev, todos: false }));
      }
    };

    fetchTodos();
  }, []);

  const resetLoading = async (key: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }));

    try {
      if (key === "posts") {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        const data = await response.json();
        setPostsData(data);
      } else if (key === "users") {
        const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=1");
        const data = await response.json();
        setUsersData(data);
      } else if (key === "todos") {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const data = await response.json();
        setTodosData(data);
      }
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    } finally {
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px" }}>AutoSkeletonLoader with API Integration</h1>
        <p style={{ color: "#6b7280", fontSize: "16px" }}>Examples using data from JSONPlaceholder API</p>
      </div>

      {/* Posts Example */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Posts</h2>
          <button
            onClick={() => resetLoading("posts")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Reload
          </button>
        </div>
        <AutoSkeletonLoader loading={loadingStates.posts || !postsData} component={<PostCard post={postsData?.[0]} />} inheritStyles shimmer />
      </section>

      {/* Users Example */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>User Profile</h2>
          <button
            onClick={() => resetLoading("users")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Reload
          </button>
        </div>
        <AutoSkeletonLoader loading={loadingStates.users || !usersData} component={<UserProfile user={usersData?.[0]} />} inheritStyles shimmer />
      </section>

      {/* Todos Example */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Todo List</h2>
          <button
            onClick={() => resetLoading("todos")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Reload
          </button>
        </div>
        <AutoSkeletonLoader
          loading={loadingStates.todos || !todosData}
          component={<TodoList todos={todosData || undefined} />}
          inheritStyles
          shimmer
        />
      </section>

      {/* Multiple Posts Grid */}
      <section style={{ marginBottom: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Multiple Posts Grid</h2>
          <button
            onClick={() => resetLoading("posts")}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Reload
          </button>
        </div>
        <AutoSkeletonLoader
          loading={loadingStates.posts || !postsData}
          component={
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {postsData?.slice(0, 3).map((post) => (
                <div key={post.id} style={{ padding: "20px", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>{post.title}</h3>
                  <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.5" }}>{post.body.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          }
          inheritStyles
        />
      </section>

      {/* Info Section */}
      <section
        style={{
          padding: "24px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          marginTop: "60px",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>How it works</h3>
        <ul style={{ color: "#6b7280", lineHeight: "1.8", paddingLeft: "20px" }}>
          <li>
            Data is fetched from <strong>JSONPlaceholder API</strong> using the <code>fetch</code> API
          </li>
          <li>
            While data is loading, the <strong>AutoSkeletonLoader</strong> shows an animated skeleton
          </li>
          <li>Once data arrives, the actual component is rendered with the fetched data</li>
          <li>The skeleton automatically matches the structure and dimensions of your component</li>
          <li>Click "Reload" buttons to see the loading state again</li>
        </ul>
      </section>
    </div>
  );
};
