import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import '../styles/PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {
      alert("You must be logged in to view post details.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}/`, {
        headers: {
          Authorization: `Token ${token}`, // change to Bearer if using JWT
        },
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <p className="loading-text">Loading post...</p>;
  if (!post) return <p className="not-found-text">Post not found</p>;

  return (
    <div className="post-detail-container">
      <h1 className="post-detail-title">{post.title}</h1>
      <ul className="post-detail-info">
        <li><strong>Author:</strong> {post.author.username}</li>
        <li><strong>Content:</strong> {post.content}</li>
        <li><strong>Genre:</strong> {post.genre}</li>
      </ul>
      <div className="post-detail-actions">
        <Link to={`/posts/${post.id}/edit`}>
          <button className="btn btn-edit">Edit</button>
        </Link>
        <Link to={`/posts/${post.id}/delete`}>
          <button className="btn btn-delete">Delete</button>
        </Link>
      </div>
    </div>
  );
}

export default PostDetail;
