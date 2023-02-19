import "../Comics/index.css";

import axios from "axios";

import Comics from "../../components/Comics";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";

const Comic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [favoriteComicList, setFavoriteComicList] = useState([]);
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--fhx5w78hhgzd.code.run/comics?page=${page}&name=${querySearch}`
      );
      setData(response.data.results);
      setIsLoading(false);
      setMaxPage(Math.ceil(response.data.count / 20));
    };
    fetchData();
  }, [page, querySearch, favoriteComicList, setPage]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--marvel-backend--fhx5w78hhgzd.code.run/favorites-comics"
      );

      setFavoriteComicList(response.data);
    };
    fetchData();
  }, [setPage]);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <>
      <div className="div-searchbar">
        <div className="div-inner-searchbar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search for any Comics"
            value={querySearch}
            onChange={(event) => {
              setPage(1);
              setQuerySearch(event.target.value);
            }}
          />
          <FontAwesomeIcon className="loupe-icon" icon="magnifying-glass" />
        </div>
      </div>
      <div className="main-comics">
        {data.map((comic) => {
          // console.log(comic);
          for (let i = 0; i < favoriteComicList.length; i++) {
            if (favoriteComicList[i].id === comic._id) {
              return <Comics data={comic} key={comic._id} fav={"fav"} />;
            }
          }

          return <Comics data={comic} key={comic._id} />;
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

export default Comic;
