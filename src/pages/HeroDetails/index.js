import "./heroDetails.css";

import axios from "axios";

import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import Comics from "../../components/Comics";

const HeroDetails = () => {
  const location = useLocation();
  const { id, name, description } = location.state;
  // console.log(id);

  const [isLoading, setIsLoading] = useState(true);
  const [heroInfos, setHeroInfos] = useState({});
  const [data, setData] = useState({});
  const [favoriteComicList, setFavoriteComicList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--fhx5w78hhgzd.code.run/personnages/details?id=${id}`
      );
      const favComicList = await axios.get(
        "https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites-comics"
      );
      setData(response.data.comics);
      setFavoriteComicList(favComicList.data);
      setHeroInfos(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, heroInfos]);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <div className="main-hero-details">
      <div className="hero-details-top-page">
        <div className="hero-details-left bloc">
          <img
            className="hero-details-picture"
            src={`${heroInfos.thumbnail.path}.${heroInfos.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="hero-details-right-bloc">
          <div className="hero-details-name">{name}</div>
          {description ? (
            <div className="hero-details-description">{description}</div>
          ) : (
            <div>
              Sorry, data about this character is not available for civils,
              contact 911 if you know where is this man.
            </div>
          )}
        </div>
      </div>
      <div className="details-hero-comic-list">
        {data.map((comic, index) => {
          for (let i = 0; i < favoriteComicList.length; i++) {
            if (favoriteComicList[i].id === comic._id) {
              return <Comics data={comic} key={index} fav={"fav"} />;
            }
          }
          return <Comics data={comic} key={index} />;
        })}
      </div>
    </div>
  );
};

export default HeroDetails;
