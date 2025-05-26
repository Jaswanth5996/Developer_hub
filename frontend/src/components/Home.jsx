import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/Home.css'

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://127.0.0.1:8000/api/posts/?page=${page}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else if (res.data.results && Array.isArray(res.data.results)) {
          setPosts(res.data.results);
        } else {
          setPosts([]);
          setError("Unexpected response format");
          console.error("Unexpected response format", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    setPage((p) => p + 1);
  };

  return (
    <div className="home-container">
      <h1 className="home-header">Blog Posts</h1>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="no-posts-text">No posts available</p>
      )}

      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-author">Author: {post.author.username}</p>
            <p className="post-content">
              {post.content.length > 400
                ? post.content.slice(0, 400) + "..."
                : post.content}
            </p>
            <Link to={`/posts/${post.id}`} className="post-link">
              Show more...
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination-controls" style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handlePrev} disabled={page === 1} style={{ marginRight: "10px" }}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={handleNext} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
