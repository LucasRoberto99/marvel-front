import "./favHero.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavHero = ({ hero, fav, resetState, setResetState }) => {
  // console.log(hero);
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(fav ? "red" : "white");
  return (
    <div
      className="hero"
      onClick={() => {
        navigate("/hero-details", {
          state: { id: hero.id, name: hero.title, description: hero.desc },
        });
      }}
    >
      <div className="div-relativ-hero">
        <img className="hero-pic" src={hero.url} alt="img-du-hero" />
        <div
          className="div-fav-hero"
          onClick={async (event) => {
            event.stopPropagation();
            setFavorite("white");
            await axios.get(
              `https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites/add/?id=${hero.id}`
            );
            setResetState(!resetState);
          }}
        >
          <FontAwesomeIcon className={favorite} icon="heart" />
        </div>
      </div>

      <div className="hero-name">{hero.title}</div>
      <div className="hero-desc">{hero.desc}</div>
    </div>
  );
};

export default FavHero;
