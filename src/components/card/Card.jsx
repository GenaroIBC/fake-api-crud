import "./Card.css";
export function Card({ age, id, name, handleEdit, handleDelete }) {
  return (
    <article>
      <h2>{name}</h2>
      <h3>{age}</h3>
      <h4>ID: {id}</h4>
      <button onClick={() => handleEdit(id)}>Edit</button>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </article>
  );
}
