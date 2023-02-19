import "./favcomics.css";

import axios from "axios";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavComics = ({ data, fav, resetState, setResetState }) => {
  const [favorite, setFavorite] = useState(fav ? "red" : "white");

  return (
    <div className="fav-comic">
      <div className="div-relativ-comic">
        <img className="fav-pic-comic" src={data.url} alt="comic-pic" />
        <div
          className="div-fav-hero"
          onClick={async (event) => {
            event.stopPropagation();
            setFavorite("white");
            const desc = data.desc;
            await axios.post(
              `https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites-comics/add`,
              {
                id: data.id,
                title: data.title,
                desc: desc,
                url: data.url,
              }
            );
            setResetState(!resetState);
          }}
        >
          <FontAwesomeIcon className={favorite} icon="heart" />
        </div>
      </div>

      <div className="fav-comic-title">{data.title}</div>
      <div className="fav-comic-desc">{data.desc}</div>
    </div>
  );
};

export default FavComics;
