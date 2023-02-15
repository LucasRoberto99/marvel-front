import "./hero.css";

const Hero = ({ perso }) => {
  const urlPic = perso.thumbnail.path;
  // console.log(urlPic);
  const extension = perso.thumbnail.extension;
  // console.log(extension);
  return (
    <div className="hero">
      <img
        className="hero-pic"
        src={`${urlPic}/portrait_fantastic.${extension}`}
        alt="img-du-hero"
      />
      <div className="hero-name">{perso.name}</div>
      <div className="hero-desc">{perso.description}</div>
    </div>
  );
};

export default Hero;
