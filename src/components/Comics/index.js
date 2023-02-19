import "./comics.css";

import axios from "axios";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = ({ data, fav }) => {
  const [favorite, setFavorite] = useState(fav ? "red" : "white");

  const id = data._id;
  // console.log(id);

  return (
    <div className="comic">
      <div className="div-relativ-comic">
        <img
          className="hero-details-comic"
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt="comic-pic"
        />
        <div
          className="div-fav-hero"
          onClick={async (event) => {
            event.stopPropagation();
            favorite === "white" ? setFavorite("red") : setFavorite("white");
            const desc = data.description;
            await axios.post(
              `https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites-comics/add`,
              {
                id: id,
                title: data.title,
                desc: desc,
                url: `${data.thumbnail.path}.${data.thumbnail.extension}`,
              }
            );
          }}
        >
          <FontAwesomeIcon className={favorite} icon="heart" />
        </div>
      </div>

      <div className="hero-details-comic-title">{data.title}</div>
      <div className="hero-details-comic-desc">{data.description}</div>
    </div>
  );
};

export default Comics;
