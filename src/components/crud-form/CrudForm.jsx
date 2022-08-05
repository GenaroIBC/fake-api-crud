import "./CrudForm.css";
export function CrudForm({ handleSubmit, formData, handleChange }) {
  console.log(formData);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();

        e.target.name.defaultValue = "";
        e.target.age.defaultValue = "";
        e.target.name.value = "";
        e.target.age.value = "";
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        onChange={handleChange}
        value={formData.name}
        defaultValue={formData.name}
        required
        type="text"
        placeholder="name"
        id="name"
        name="name"
      />
      <label htmlFor="age">Age</label>
      <input
        onChange={handleChange}
        defaultValue={formData.age}
        value={formData.age}
        required
        type="number"
        placeholder="age"
        id="age"
        name="age"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
