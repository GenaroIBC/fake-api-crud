import React, { useState, useEffect } from "react";
import { Card } from "./components/card/Card";
import { CrudForm } from "./components/crud-form/CrudForm";
import { fetchRequest } from "./assets/helpers/fetchRequest";
import "./App.css";

const URL = "http://localhost:5555/users";

export function App() {
  const [usersData, setUsersData] = useState(null);
  const [dataToSend, setDataToSend] = useState(null);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(() => {
    // GET
    const getData = async () => {
      const data = await fetchRequest({ url: URL });
      setUsersData(data);
    };
    getData();
  }, []);

  const handleChange = e => {
    const modifiedData = {
      [e.target.name]: e.target.value,
    };
    if (userIsEditing) {
      setDataToEdit(prevData => {
        return {
          ...prevData,
          ...modifiedData,
        };
      });
    } else {
      setDataToSend(prevData => {
        return {
          ...prevData,
          ...modifiedData,
        };
      });
    }
  };

  const handleSubmit = async () => {
    if (userIsEditing) {
      // PUT
      await fetchRequest({
        url: `${URL}/${dataToEdit.id}`,
        method: "PUT",
        body: JSON.stringify(dataToEdit),
      });

      const updatedData = usersData.map(el =>
        el.id !== dataToEdit.id ? el : dataToEdit
      );
      setUsersData(updatedData);
      setDataToEdit({});
    } else {
      // POST
      const newData = await fetchRequest({
        url: URL,
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

      // task: replace newData below with dataToSend and delete that constant
      setUsersData(prevData => [...prevData, newData]);
    }
  };

  const handleDelete = async id => {
    // DELETE
    await fetchRequest({
      url: `${URL}/${id}`,
      method: "DELETE",
    });
    setUsersData(prevData => prevData.filter(el => el.id !== id));
  };

  const handleEdit = id => {
    setDataToEdit(usersData.find(el => el.id === id));
  };

  const userIsEditing = Object.keys(dataToEdit).length;

  return (
    <>
      <br />
      <h1 className="tac">CRUD with AJAX, JSON-SERVER and React</h1>
      <section>
        <h2 className="tac">
          <span>{userIsEditing ? "Edit" : "Create new"} </span>
          user
        </h2>
        <CrudForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={dataToEdit}
        />
      </section>
      <br />
      <section className="users-data-container">
        {usersData
          ? usersData.map(({ age, id, name }) => (
              <Card
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                key={id}
                age={age}
                id={id}
                name={name}
              />
            ))
          : "cargando"}
      </section>
    </>
  );
}
