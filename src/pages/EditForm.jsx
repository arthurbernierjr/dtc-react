import { useParams } from "react-router";
import Form from "./Form.jsx";

export default function EditForm({ posts, handleSubmit }) {
  const { id } = useParams();
  const todo = posts.find((p) => String(p.id) === id);
  if (!todo) return <p style={{ textAlign: "center" }}>Loading…</p>;
  // key forces a fresh Form (and fresh state) when the id changes
  return <Form key={todo.id} initialTodo={todo} handleSubmit={handleSubmit} buttonLabel="update todo" />;
}
