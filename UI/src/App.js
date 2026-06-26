import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser, login } from "./api";
import "./style.css"; // ✅ Import CSS

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", phone: "", state: "" });
  const [editId, setEditId] = useState(null);
  const [auth, setAuth] = useState(false);
  const [credentials, setCredentials] = useState({ userName: "", password: "" });

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuth(true);
      loadUsers();
    }
  }, []);

  // ✅ Load users (protected)
  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
      if (err.response?.status === 401) {
        setAuth(false);
      }
    }
  };

  // ✅ Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login(credentials.userName, credentials.password);
      if (result.token) {
        setAuth(true);
        loadUsers();
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // ✅ Handle logout
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setAuth(false);
    setUsers([]);
  };

  // ✅ Handle create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

  // Validate all fields
  if (
    !form.name.trim() ||
    !form.address.trim() ||
    !form.phone.trim() ||
    !form.state.trim()
  ) {
    alert("Please fill all fields.");
    return;
  }

  try {
    if (editId) {
      await updateUser(editId, form);
      setEditId(null);
    } else {
      await createUser(form);
    }

    setForm({
      name: "",
      address: "",
      phone: "",
      state: "",
    });

    loadUsers();
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user.userId);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // ✅ Render login if not authenticated
  if (!auth) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-visual">
            <div className="login-orb orb-one"></div>
            <div className="login-orb orb-two"></div>
            <div className="login-visual-content">
              <span className="login-badge">Welcome back</span>
              <h1>Manage everything in one place</h1>
              <p>Track users, update records, and stay in control of your dashboard.</p>
            </div>
          </div>

          <div className="login-form-panel">
            <div>
              <span className="login-tag">Admin Portal</span>
              <h2>Sign In</h2>
              <p className="login-subtitle">Enter your credentials to continue</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-group">
                <span>👤</span>
                <input
                  placeholder="Username"
                  value={credentials.userName}
                  onChange={(e) => setCredentials({ ...credentials, userName: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <span>🔒</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Render CRUD UI if authenticated
  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>User Management</h2>
        <button className="logout-btn" onClick={logout}>
          <span>⎋</span> Logout
        </button>
      </div>

      <form className="user-form" onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        <button type="submit"
  disabled={
    !form.name.trim() ||
    !form.address.trim() ||
    !form.phone.trim() ||
    !form.state.trim()
  }
>
  {editId ? "Update User" : "Add User"}
  </button>
  
      </form>

      <h3>Users List</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.name}</td>
              <td>{u.address}</td>
              <td>{u.phone}</td>
              <td>{u.state}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(u)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(u.userId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
