import Post from "../components/Post.jsx";

export default function AllPosts({ posts }) {
  // One Post component per todo; the id is the stable key
  return posts.map((post) => <Post post={post} key={post.id} />);
}
