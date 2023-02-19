import "./hero.css";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hero = ({ perso, fav }) => {
  const urlPic = perso.thumbnail.path;
  // console.log(urlPic);
  const extension = perso.thumbnail.extension;
  // console.log(extension);
  const id = perso._id;
  // console.log(id);
  const [favorite, setFavorite] = useState(fav ? "red" : "white");

  const navigate = useNavigate();

  return (
    <div
      className="hero"
      onClick={() => {
        navigate("/hero-details", {
          state: { id: id, name: perso.name, description: perso.description },
        });
      }}
    >
      <div className="div-relativ-hero">
        <img
          className="hero-pic"
          src={`${urlPic}/portrait_fantastic.${extension}`}
          alt="img-du-hero"
        />
        <div
          className="div-fav-hero"
          onClick={async (event) => {
            event.stopPropagation();
            favorite === "white" ? setFavorite("red") : setFavorite("white");
            await axios.get(
              `https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites/add/?id=${id}&title=${perso.name}&desc=${perso.description}&url=${urlPic}/portrait_fantastic.${extension}`
            );
          }}
        >
          <FontAwesomeIcon className={favorite} icon="heart" />
        </div>
      </div>

      <div className="hero-name">{perso.name}</div>
      <div className="hero-desc">{perso.description}</div>
    </div>
  );
};

export default Hero;
