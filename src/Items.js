import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard"; 
import Loading from "./Loading"; 
import { Link } from "react-router-dom";
import './Items.css'; 

function Items() {
  const [items, setItems] = useState([]);
  const [subBreedFilter, setSubBreedFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        const breedList = Object.keys(data.message).map(breed => ({ name: breed, subBreeds: data.message[breed] }));
        setItems(breedList);
      } catch (error) {
        console.log("Error occurred", error);
        setError("Failed to fetch items.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const breedMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const subBreedMatch = subBreedFilter === "" || item.subBreeds.includes(subBreedFilter);
    return breedMatch && subBreedMatch;
  });

  const allSubBreeds = [...new Set(items.flatMap(item => item.subBreeds))];

  return (
    <div className="items-container">
      <h1 className="page-title">Browse Dog Breeds</h1>
      <p className="page-description">Use the search or filter by sub-breed to find specific breeds. Click on a breed to learn more!</p>

      {isLoading && <Loading />}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="search-filter-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search breeds..."
          className="search-input"
        />

        <select
          value={subBreedFilter}
          onChange={(e) => setSubBreedFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Sub-breeds</option>
          {allSubBreeds.map((subBreed, index) => (
            <option key={index} value={subBreed}>
              {subBreed}
            </option>
          ))}
        </select>
      </div>

      <div className="items-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Link key={item.name} to={`/item-details/${item.name}`} className="item-link">
              <ItemCard item={item} />
            </Link>
          ))
        ) : (
          <p className="no-results">No breeds found.</p>
        )}
      </div>
    </div>
  );
}

export default Items;
