import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
const JSONData = {
  users: [
    {
      name: "Aaron Piper",
      age: 19,
      hobbies: ["singing", "swimming"],
      id: 1,
    },
    {
      name: "Esteban Quito",
      age: 24,
      hobbies: ["walking", "play video-games"],
      id: 2,
    },
    {
      name: "Sherlock Holmes",
      age: 39,
      hobbies: ["investigate", "boxing"],
      id: 3,
    },
    {
      name: "Jon Mircha",
      age: 34,
      hobbies: ["coding", "running", "trainning"],
      id: 4,
    },
  ],
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App JSONData={JSONData.users} />
  </React.StrictMode>
);
