import { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await API.post("/register", form);
    alert("Registered");
  };

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
      <input placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
      <button onClick={submit}>Register</button>
    </div>
  );
}