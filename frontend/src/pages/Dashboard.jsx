import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch grievances
  const fetchData = async () => {
    const res = await API.get("/grievances");
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add grievance
  const submit = async () => {
    await API.post("/grievances", form);
    fetchData();
  };

  // Delete
  const deleteG = async (id) => {
    await API.delete(`/grievances/${id}`);
    fetchData();
  };

  // Update
  const updateG = async (id) => {
    const title = prompt("New title?");
    if (!title) return;
    await API.put(`/grievances/${id}`, { title });
    fetchData();
  };

  // Search
  const searchG = async () => {
    const res = await API.get(`/grievances/search/title?title=${search}`);
    setGrievances(res.data);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      {/* Form */}
      <div className="form">
        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <button onClick={submit}>Submit</button>
      </div>

      {/* Search */}
      <div>
        <input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchG}>Search</button>
      </div>

      {/* List */}
      <div>
        {grievances.map((g) => (
          <div key={g._id} className="card">
            <h3>{g.title}</h3>
            <p>{g.description}</p>
            <p>{g.category}</p>
            <p>Status: {g.status}</p>

            <button onClick={() => updateG(g._id)}>Update</button>
            <button onClick={() => deleteG(g._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}