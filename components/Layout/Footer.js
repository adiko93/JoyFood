import style from "../../styles/Layout/Footer.module.css";

export default function Footer(props) {
  return (
    <footer>
      <div className={style.container}>
        <span className={style.copyrights}>
          Copyright Adrian Skupien. This is non profit project. All the data was
          scraped from other site's
        </span>
      </div>
    </footer>
  );
}
