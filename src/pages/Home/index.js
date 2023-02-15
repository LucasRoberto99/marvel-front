import "./home.css";

import axios from "axios";

import Hero from "../../components/Hero";

import { useState, useEffect } from "react";

const Home = ({ querySearch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--marvel-backend--fhx5w78hhgzd.code.run/personnages?page=${page}&name=${querySearch}`
      );
      setData(response.data.results);
      setIsLoading(false);
      setMaxPage(Math.ceil(response.data.count / 100));
    };
    fetchData();
  }, [page, querySearch]);

  return isLoading ? (
    <div>LOADING ...</div>
  ) : (
    <>
      <div className="main">
        {data.map((perso, index) => {
          return <Hero perso={perso} key={index} />;
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
