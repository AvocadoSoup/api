import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${id}/images/random`);
        const data = await response.json();
        setImage(data.message);

        const breedsResponse = await fetch(`https://dog.ceo/api/breeds/list/all`);
        const breedsData = await breedsResponse.json();
        const breedInfo = breedsData.message[id] ? { name: id, subBreeds: breedsData.message[id] } : { name: id, subBreeds: [] };
        setItem(breedInfo);
      } catch (error) {
        console.log("Error occurred", error);
        setError("Failed to fetch item details.");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchItemDetails();
  }, [id]);

  return (
    <div className="item-details">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <h1>{item.name}</h1>
          {image && <img src={image} alt={item.name} className="breed-image" />}
          <p className="sub-breed-text">
            Sub-breeds: {item.subBreeds.length > 0 ? item.subBreeds.join(", ") : "None"}
          </p>
        </>
      )}
    </div>
  );
}

export default ItemDetails;
