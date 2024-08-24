import React from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import Home from "../img/icons8-home-512.png";
import Post from "../img/icons8-create-post-96.png";

const Header = () => (
  <div className="top">
    <h1>ZUAI</h1>
    <div className="header">
      <h1 className="heading">My Blog</h1>
      <nav className="nav">
        <div className="home">
          <img src={Home} alt="home.png" />
          <Link to="/">Home</Link>
        </div>
        <div className="post">
          <img src={Post} alt="post.png" />
          <Link to="/new">Create New Post</Link>
        </div>
      </nav>
    </div>
    <button className="login">Login</button>
  </div>
);

export default Header;
