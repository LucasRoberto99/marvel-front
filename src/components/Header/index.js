import "./header.css";
import backgroundStars from "../../pictures/bgcgalaxy.jpg";
import marvelhero from "../../pictures/marvelhero.jpg";
import marvelLogo from "../../pictures/marvel_Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");
  const [refresh, setRefresh] = useState(true);

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      if (password !== confirmP) {
        alert("please confirm your password");
        return;
      }

      let formSend = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://site--marvel-backend--fhx5w78hhgzd.code.run/user/signup",
        formSend
      );
      Cookies.set("tokenmarvel", response.data.token);
      alert("Submited");
      setSignupModal(false);
      setEmail("");
      setConfirmP("");
      setPassword("");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      if (email && password) {
        let formSend = {
          email: email,
          password: password,
        };

        const response = await axios.post(
          `https://site--marvel-backend--fhx5w78hhgzd.code.run/user/login`,
          formSend
        );
        Cookies.set("tokenmarvel", response.data.token);
        alert("Succes");
        setLoginModal(false);
        setEmail("");
        setConfirmP("");
        setPassword("");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <img className="bgc-galaxy" src={backgroundStars} alt="bgcGalaxy" />
      <div className="container">
        <div className="marvel-banner">
          <div className="connectingstuff">
            <button
              className={Cookies.get("tokenmarvel") ? "nodisplay" : ""}
              onClick={() => {
                setSignupModal(true);
              }}
            >
              Signup
            </button>
            <button
              className={Cookies.get("tokenmarvel") ? "nodisplay" : ""}
              onClick={() => {
                setLoginModal(true);
              }}
            >
              Login
            </button>
            <button
              className={Cookies.get("tokenmarvel") ? "" : "nodisplay"}
              onClick={() => {
                Cookies.remove("tokenmarvel");
                setRefresh(!refresh);
              }}
            >
              Logout
            </button>
          </div>
          <img className="marvel-hero-pic" src={marvelhero} alt="marvelHero" />
          <img
            onClick={() => {
              navigate("/");
            }}
            className="marvel-logo"
            src={marvelLogo}
            alt="marvelLogo"
          />
        </div>
        <div className="header-button">
          <button
            className="button-style1"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/hero");
            }}
          >
            Heroes
          </button>
          <button
            className="button-style1"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/comics");
            }}
          >
            Comics
          </button>
          <button
            className="button-style1"
            onClick={() => {
              window.scrollTo(0, 0);
              if (Cookies.get("tokenmarvel")) {
                navigate("/favorites");
              } else {
                alert("You must connect to create a fav list");
              }
            }}
          >
            Favorites
          </button>
        </div>
      </div>

      {signupModal && (
        <div className="div-main-modal">
          <form className="div-form" onSubmit={handleSignup}>
            <span
              className="red-cross"
              onClick={() => {
                setSignupModal(false);
              }}
            >
              ❌
            </span>
            <div className="form-title">Sign up 📝</div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmP}
              onChange={(event) => {
                setConfirmP(event.target.value);
              }}
            />
            <button>Create account</button>
          </form>
        </div>
      )}
      {loginModal && (
        <div className="div-main-modal">
          <form className="div-form" onSubmit={handleLogin}>
            <span
              className="red-cross"
              onClick={() => {
                setLoginModal(false);
              }}
            >
              ❌
            </span>
            <div className="form-title">Login 👨🏻‍💻</div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button>Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Header;
