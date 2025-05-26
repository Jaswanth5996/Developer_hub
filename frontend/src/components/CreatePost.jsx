import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {
      alert("You must be logged in to create a post.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .post(
        "http://127.0.0.1:8000/api/posts/",
        { title, content, genre },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
          },
        }
      )
      .then(() => {
        alert("Post created!");
        navigate("/");
      })
      .catch((err) => {
        alert(
          "Error creating post: " +
            (err.response?.data
              ? JSON.stringify(err.response.data)
              : err.message)
        );
        console.error(err);
      });
  };

  return (
    <form className="createpost-form" onSubmit={handleSubmit}>
      <h2 className="createpost-header">Create Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="createpost-input"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
        rows={6}
        className="createpost-textarea"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
        className="createpost-input"
      />
      <div className="createpost-buttons">
        <button type="submit" className="btn-submit">Submit</button>
        <button type="button" onClick={() => navigate(-1)} className="btn-cancel">Cancel</button>
      </div>
    </form>
  );
}

export default CreatePost;
