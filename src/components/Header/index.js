import "./header.css";
import backgroundStars from "../../pictures/bgcgalaxy.jpg";
import marvelhero from "../../pictures/marvelhero.jpg";
import marvelLogo from "../../pictures/marvel_Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ querySearch, setQuerySearch }) => {
  return (
    <>
      <img className="bgc-galaxy" src={backgroundStars} alt="bgcGalaxy" />
      <div className="container">
        <div className="marvel-banner">
          <img className="marvel-hero-pic" src={marvelhero} alt="marvelHero" />
          <img className="marvel-logo" src={marvelLogo} alt="marvelLogo" />
        </div>
        <div className="header-button">
          <button className="button-style1">Heroes</button>
          <button className="button-style1">Comics</button>
          <button className="button-style1">Favorites</button>
        </div>
        <div className="div-searchbar">
          <div className="div-inner-searchbar">
            <input
              className="searchbar"
              type="text"
              placeholder="Search for any Hero"
              value={querySearch}
              onChange={(event) => {
                setQuerySearch(event.target.value);
              }}
            />
            <FontAwesomeIcon className="loupe-icon" icon="magnifying-glass" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
