import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Dog Breed Explorer</h1>
      <p className="intro-text">
        Discover hundreds of dog breeds and learn more about their unique characteristics.
      </p>
      <p className="intro-text">
        Start by browsing through our list of dog breeds, filter by sub-breeds, and click on any breed to learn more.
      </p>
      <Link to="/items" className="explore-button">Explore Dog Breeds</Link>
    </div>
  );
}

export default Home;
