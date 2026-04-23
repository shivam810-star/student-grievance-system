import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await API.post("/register", form);
      alert("Registered Successfully");
      navigate("/login");
    } catch {
      alert("Error / Email already exists");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />

      <button onClick={submit}>Register</button>

      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}