import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/EditPost.css';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {
      alert("You must be logged in to edit a post.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}/`, {
        headers: {
          Authorization: `Token ${token}`, // Change to Bearer if using JWT
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setGenre(res.data.genre);
      })
      .catch((err) => {
        alert("Failed to fetch post");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://127.0.0.1:8000/api/posts/${id}/`,
        { title, content, genre },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        alert("Post updated!");
        navigate(`/posts/${id}`);
      })
      .catch((err) => {
        alert("Error updating post: " + (err.response?.data ? JSON.stringify(err.response.data) : err.message));
        console.error(err);
      });
  };

  if (loading) return <p className="loading-text">Loading post...</p>;

  return (
    <form className="editpost-form" onSubmit={handleSubmit}>
      <h2 className="editpost-header">Edit Post</h2>
      <input
        className="editpost-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className="editpost-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        rows={6}
      />
      <input
        className="editpost-input"
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
      />
      <div className="editpost-buttons">
        <button type="submit" className="btn-update">Update</button>
        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </form>
  );
}

export default EditPost;
