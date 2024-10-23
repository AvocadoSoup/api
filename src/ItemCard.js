import React, { useEffect, useState } from "react";

function ItemCard({ item }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchBreedImage = async () => {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${item.name}/images/random`);
        const data = await response.json();
        setImage(data.message);
      } catch (error) {
        console.log("Error occurred while fetching image", error);
      }
    };

    fetchBreedImage();
  }, [item.name]);

  return (
    <div className="item-card">
      <h2>{item.name}</h2>
      <img
        src={image ? image : 'https://via.placeholder.com/150'}
        alt={item.name}
        style={{ width: "150px", height: "auto" }}
      />
      <p>Sub-breeds: {item.subBreeds.length > 0 ? item.subBreeds.join(", ") : "None"}</p>
    </div>
  );
}

export default ItemCard;
