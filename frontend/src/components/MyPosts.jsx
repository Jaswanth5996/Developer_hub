import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../styles/MyPosts.css';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {
      alert("You must be logged in to view your posts.");
      navigate("/login");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/my-posts/", {
        headers: {
          Authorization: `Token ${token}`, // Change to `Bearer` if you're using JWT
        },
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching posts");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return <p className="loading-text">Loading your posts...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="myposts-container">
      <h1 className="myposts-header">My Posts</h1>
      {posts.length === 0 ? (
        <p className="no-posts-text">Nothing to show</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mypost-item">
            <h2 className="mypost-title">{post.title}</h2>
            <p className="mypost-content">{post.content.slice(0, 800)}</p>
            <Link to={`/posts/${post.id}`} className="mypost-link">Show more...</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default MyPosts;
