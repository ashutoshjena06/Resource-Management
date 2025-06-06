import React, { useEffect, useState } from "react";
import axios from "axios";
import "./manageEmployee.css"; // Optional CSS
import { EditUserForm } from "./EditUserForm";
import { useCookies } from "react-cookie";

export const ManageEmployee = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For view modal/card
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  // For edit modal
  const [cookies] = useCookies(["Email"]);
  const isAdmin = cookies.Email === "admin@gmail.com";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getAll/${cookies.Email}`) // adjust base URL if needed
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/api/delete/${email}`);
        setUsers(users.filter((u) => u.email !== email));
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleEdit = (email) => {
    const userToEdit = users.find((u) => u.email === email);
    setEditUser(userToEdit);
  };
  const handleSaveEdit = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/update/${updatedUser.email}`,
        updatedUser
      );
      const updated = response.data;
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.email === updated.email ? updated : u))
      );
      setEditUser(null);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Management</h2>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        {/* Search Input */}
        <input
          type="text"
          className="form-control mb-2 mb-md-0 me-md-3"
          style={{ maxWidth: "400px", flex: "1" }}
          placeholder="Search by first name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <div className="col-md-4 d-flex align-items-center justify-content-md-end">
          <div className="d-flex align-items-center gap-2 w-100 justify-content-end">
            <label htmlFor="sortBy" className="fw-bold mb-0">
              Sort by:
            </label>
            <select
              id="sortBy"
              className="form-select form-select-sm w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              <option value="firstName">First Name (A-Z)</option>
              <option value="lastName">Last Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        {[...users]
          .filter((user) =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => {
            if (sortBy === "firstName")
              return a.firstName.localeCompare(b.firstName);
            if (sortBy === "lastName")
              return a.lastName.localeCompare(b.lastName);
            return 0;
          })
          .map((user, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                {user.photo ? (
                  <div className="d-flex justify-content-center mt-3">
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="rounded-circle shadow"
                      style={{
                        height: "120px",
                        width: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div className="bg-secondary text-white text-center py-5">
                    No Image
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <div className="d-flex justify-content-between">
                    {isAdmin ? (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(user.email)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-info"
                          onClick={() => handleView(user)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(user.email)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <div className="d-flex justify-content-center w-100">
                        <button
                          className="btn btn-info"
                          onClick={() => handleView(user)}
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* View Modal/Card */}
      {selectedUser && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      src={selectedUser.photo}
                      alt="Profile"
                      className="img-fluid rounded shadow"
                    />
                  </div>
                  <div className="col-md-7">
                    <h4>
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h4>
                    <p>
                      <strong>Email:</strong> {selectedUser.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedUser.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Address:</strong> {selectedUser.address || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isAdmin && editUser && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <EditUserForm
                  user={editUser}
                  onSave={handleSaveEdit}
                  onCancel={() => setEditUser(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
