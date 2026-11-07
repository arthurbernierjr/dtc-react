import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";

import AllPosts from "./pages/AllPosts.jsx";
import SinglePost from "./pages/SinglePost.jsx";
import Form from "./pages/Form.jsx";
import EditForm from "./pages/EditForm.jsx";

// Read the API origin from .env.local (see Setup); fall back to a local server.
const API = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export default function App() {
  ////////////////////
  // Style objects
  ////////////////////
  const h1 = { textAlign: "center", margin: "10px" };
  const button = { backgroundColor: "navy", color: "whitesmoke", display: "block", margin: "auto" };

  ///////////////
  // State & other variables
  ///////////////
  const [posts, setPosts] = useState([]);
  const nullTodo = { subject: "", details: "" };
  const navigate = useNavigate();

  //////////////
  // Functions
  //////////////
  async function getTodos() {
    const response = await fetch(`${API}/todos`);
    if (!response.ok) throw new Error(`GET ${API}/todos failed: ${response.status}`);
    const data = await response.json();
    setPosts(data);
  }

  async function addTodo(newTodo) {
    await fetch(`${API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    await getTodos();
  }

  async function updateTodo(todo) {
    await fetch(`${API}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    await getTodos();
  }

  async function deleteTodo(todo) {
    await fetch(`${API}/todos/${todo.id}`, { method: "DELETE" });
    await getTodos();
    navigate("/");
  }

  //////////////
  // Effects
  //////////////
  useEffect(() => {
    let ignore = false;
    fetch(`${API}/todos`)
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) setPosts(data);
      });
    return () => {
      ignore = true;
    };
  }, []);

  //////////////////////////
  // Returned JSX
  //////////////////////////
  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new">
        <button style={button}>Create New Todo</button>
      </Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts} />} />
        <Route path="/post/:id" element={<SinglePost posts={posts} deleteTodo={deleteTodo} />} />
        <Route
          path="/new"
          element={<Form initialTodo={nullTodo} handleSubmit={addTodo} buttonLabel="create todo" />}
        />
        <Route path="/edit/:id" element={<EditForm posts={posts} handleSubmit={updateTodo} />} />
      </Routes>
    </div>
  );
}
