import "./favorites.css";

import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";

import axios from "axios";
import FavHero from "../../components/FavHero";
import FavComics from "../../components/FavComics";

const Favorite = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataFavHero, setDataFavHero] = useState([]);
  const [dataFavComics, setDataFavComics] = useState([]);
  const [resetState, setResetState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites"
      );
      const responseComics = await axios.get(
        "https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites-comics"
      );
      setDataFavHero(response.data);
      setDataFavComics(responseComics.data);
      setIsLoading(false);
    };
    fetchData();
  }, [resetState]);
  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <div className="main-favorite">
      {dataFavHero.length === 0 ? (
        <div className="alertfav">
          🦸‍♂️ Add more heroes to your favorite list 🦸‍♀️
        </div>
      ) : (
        <div className="div-caroussel-hero">
          <div className="caroussel-hero-title">Favorites heroes :</div>
          <div className="caroussel-hero-fav">
            {dataFavHero.map((hero) => {
              return (
                <FavHero
                  hero={hero}
                  key={hero.id}
                  fav={"fav"}
                  resetState={resetState}
                  setResetState={setResetState}
                />
              );
            })}
          </div>
        </div>
      )}
      {dataFavComics.length === 0 ? (
        <div className="alertfav">
          📚 Add more comics to your favorite list 📚
        </div>
      ) : (
        <div className="div-caroussel-comic">
          <div className="caroussel-hero-title">Favorites comics :</div>
          <div className="caroussel-comic-fav">
            {dataFavComics.map((comic) => {
              return (
                <FavComics
                  data={comic}
                  fav={"fav"}
                  key={comic.id}
                  resetState={resetState}
                  setResetState={setResetState}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
