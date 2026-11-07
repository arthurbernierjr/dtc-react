import { useState } from "react";
import { useNavigate } from "react-router";

export default function Form({ initialTodo, handleSubmit, buttonLabel }) {
  const navigate = useNavigate();

  // Seed the form with the initial todo
  const [formData, setFormData] = useState(initialTodo);

  // Standard controlled-input change handler
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function onSubmit(event) {
    event.preventDefault(); // no full-page form post
    await handleSubmit(formData);
    navigate("/"); // back to the list
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
      <input type="text" name="details" value={formData.details} onChange={handleChange} />
      <input type="submit" value={buttonLabel} />
    </form>
  );
}
