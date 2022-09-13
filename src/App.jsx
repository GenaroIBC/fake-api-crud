import React, { useState, useEffect, useReducer } from "react";
import { Card } from "./components/card/Card";
import { CrudForm } from "./components/crud-form/CrudForm";
import { fetchRequest } from "./assets/helpers/fetchRequest";
import "./App.css";
import { crudInitialState, crudReducer } from "./reducers/crudReducer";
import { TYPES } from "./actions/crudActions";

const URL = "http://localhost:5555/users";

export function App() {
  const [crudState, crudDispatch] = useReducer(crudReducer, crudInitialState);

  // const [usersData, setUsersData] = useState(null);
  const [dataToSend, setDataToSend] = useState(null);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(() => {
    // GET
    const getData = async () => {
      const data = await fetchRequest({ url: URL });
      crudDispatch({ type: TYPES.GET_ALL_DATA, payload: data });
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

      // setUsersData(updatedData);
      crudDispatch({ type: TYPES.UPDATE_ONE, payload: dataToEdit });
      setDataToEdit({});
    } else {
      // POST
      const newData = await fetchRequest({
        url: URL,
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

      // task: replace newData below with dataToSend and delete that constant
      // setUsersData(prevData => [...prevData, newData]);
      crudDispatch({ type: TYPES.CREATE_ONE, payload: newData });
    }
  };

  const handleDelete = async id => {
    // DELETE
    await fetchRequest({
      url: `${URL}/${id}`,
      method: "DELETE",
    });
    crudDispatch({ type: TYPES.DELETE_ONE, payload: id });
    // setUsersData(prevData => prevData.filter(el => el.id !== id));
  };

  const handleEdit = id => {
    setDataToEdit(crudState.users.find(el => el.id === id));
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
          formData={crudState.users}
        />
      </section>
      <br />
      <section className="users-data-container">
        {crudState.users
          ? crudState.users.map(({ age, id, name }) => (
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
