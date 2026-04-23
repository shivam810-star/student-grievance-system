import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic",
  });
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch grievances
  const fetchData = async () => {
    try {
      const res = await API.get("/grievances");
      setGrievances(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired, login again");
        logout();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add grievance
  const submit = async () => {
    if (!form.title || !form.description) {
      return alert("Fill all fields");
    }

    try {
      await API.post("/grievances", form);
      setForm({ title: "", description: "", category: "Academic" });
      fetchData();
    } catch {
      alert("Error submitting grievance");
    }
  };

  // Delete
  const deleteG = async (id) => {
    try {
      await API.delete(`/grievances/${id}`);
      fetchData();
    } catch {
      alert("Delete failed");
    }
  };

  // Update
  const updateG = async (id) => {
    const title = prompt("Enter new title");
    if (!title) return;

    try {
      await API.put(`/grievances/${id}`, { title });
      fetchData();
    } catch {
      alert("Update failed");
    }
  };

  // Search
  const searchG = async () => {
    try {
      const res = await API.get(
        `/grievances/search/title?title=${search}`
      );
      setGrievances(res.data);
    } catch {
      alert("Search failed");
    }
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
          value={form.title}
          placeholder="Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          value={form.description}
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
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
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchG}>Search</button>
        <button onClick={fetchData}>Reset</button>
      </div>

      {/* List */}
      <div>
        {grievances.length === 0 ? (
          <p>No grievances found</p>
        ) : (
          grievances.map((g) => (
            <div key={g._id} className="card">
              <h3>{g.title}</h3>
              <p>{g.description}</p>
              <p>Category: {g.category}</p>
              <p>Status: {g.status}</p>

              <button onClick={() => updateG(g._id)}>
                Update
              </button>
              <button onClick={() => deleteG(g._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}