import "./home.css";

import axios from "axios";

import Hero from "../../components/Hero";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [favoriteHeroList, setFavoriteHeroList] = useState([]);
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--fhx5w78hhgzd.code.run/personnages?page=${page}&name=${querySearch}`
      );
      setData(response.data.results);
      setIsLoading(false);
      setMaxPage(Math.ceil(response.data.count / 20));
    };
    fetchData();
  }, [page, querySearch, favoriteHeroList, setPage]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites"
      );

      setFavoriteHeroList(response.data);
    };
    fetchData();
    // console.log("hey");
  }, [page]);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <>
      <div className="div-searchbar">
        <div className="div-inner-searchbar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search for any Hero"
            value={querySearch}
            onChange={(event) => {
              setPage(1);
              setQuerySearch(event.target.value);
            }}
          />
          <FontAwesomeIcon className="loupe-icon" icon="magnifying-glass" />
        </div>
      </div>
      <div className="main-home">
        {data.map((perso) => {
          for (let i = 0; i < favoriteHeroList.length; i++) {
            if (favoriteHeroList[i].id === perso._id) {
              return (
                <Hero
                  perso={perso}
                  key={perso.name}
                  list={favoriteHeroList}
                  fav={"fav"}
                />
              );
            }
          }
          return <Hero perso={perso} key={perso.name} />;
        })}
      </div>
      <div className="paginate-button">
        {page > 1 ? (
          <button
            onClick={() => {
              setPage(page - 1);
              window.scrollTo(0, 0);
            }}
          >
            Previous
          </button>
        ) : null}
        {page < maxPage ? (
          <button
            onClick={() => {
              setPage(page + 1);
              window.scrollTo(0, 0);
            }}
          >
            Next
          </button>
        ) : null}
      </div>
    </>
  );
};

export default Home;
