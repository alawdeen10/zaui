import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import "./css/PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="post-list">
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
