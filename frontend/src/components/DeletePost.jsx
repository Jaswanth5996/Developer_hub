import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/DeletePost.css';

function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      return;
    }

    axios
      .delete(`http://127.0.0.1:8000/api/posts/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => {
        setDeleted(true);
        setTimeout(() => navigate("/"), 2000); 
      })
      .catch((err) => {
        setError("Error deleting post");
        console.error(err);
      });
  };

  return (
    <div className="deletepost-container">
      {!deleted ? (
        <>
          <h2 className="deletepost-header">Are you sure you want to delete this post?</h2>
          <div className="deletepost-buttons">
            <button className="btn-delete" onClick={handleDelete}>
              Yes, Delete
            </button>
            <button className="btn-cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        <h2 className="deletepost-header">Post deleted successfully! Redirecting...</h2>
      )}
    </div>
  );
}

export default DeletePost;
