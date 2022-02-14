import style from "../../styles/Layout/Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={style.container}>
      <span className={style.containerCopyrights}>
        Copyright Adrian Skupien. This is non profit project. All the data was
        scraped from other site&apos;s
      </span>
    </footer>
  );
};

export default Footer;
