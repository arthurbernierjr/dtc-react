import { Link, useParams } from "react-router";

export default function SinglePost({ posts, deleteTodo }) {
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);

  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  if (!post) return <p style={{ textAlign: "center" }}>Loading…</p>;

  return (
    <div style={div}>
      <h1>{post.subject}</h1>
      <h2>{post.details}</h2>
      <Link to={`/edit/${post.id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={() => deleteTodo(post)}>Delete</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}
