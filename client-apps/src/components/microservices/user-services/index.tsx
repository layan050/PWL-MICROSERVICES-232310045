"use client";

import React, { useEffect, useState } from "react";
// IMPORTANT: Adjust this import path if your UserServices are located somewhere else!
import { GET_ALL_USERS, DELETE_USER } from "@/components/apis/UserServices";

// Define the shape of your User data
interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log("Fetching from:", process.env.NEXT_PUBLIC_API_GATEWAY_URL);
      
      const results: any = await GET_ALL_USERS(); 
      
      // If results is empty, it might be the RequestAPI hook returning a default {}
      console.log("Raw Response Type:", typeof results);
      console.log("Raw Response Content:", JSON.stringify(results));

      if (results && Array.isArray(results)) {
        setUsers(results);
      } else if (results && results.data && Array.isArray(results.data)) {
        setUsers(results.data);
      } else if (results && results.data?.data && Array.isArray(results.data.data)) {
        setUsers(results.data.data);
      } else {
        // This is where you are currently landing
        console.warn("No array found. Is the database empty?");
        setUsers([]); 
      }
    } catch (error) {
      console.error("Connection failed:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await DELETE_USER(id);
        fetchUsers(); // Refresh the table after deleting
      } catch (error) {
        console.error("Failed to delete user", error);
        alert("Failed to delete user.");
      }
    }
  };

  // Fetch users when the page first loads
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading users...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <button 
        onClick={fetchUsers} 
        style={{ marginBottom: "15px", padding: "8px 12px", cursor: "pointer" }}
      >
        Refresh Data
      </button>
      
      <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* We check if users is an array AND if it has data before mapping */}
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role || "-"}</td>
                <td>
                  <button style={{ marginRight: "10px", cursor: "pointer" }}>Edit</button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                No users found or error loading data. Check the console!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}