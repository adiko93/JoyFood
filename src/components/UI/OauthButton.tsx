import styles from "../../styles/UI/OauthButton.module.scss";

const OauthButton: React.FC<{
  color?: string;
  href?: string;
  style?: string;
}> = ({ color: colorProp, href, style, children }) => {
  let color = styles.facebook;

  switch (colorProp) {
    case "google":
      color = styles.google;
  }

  return (
    <a className={`${styles.link} ${color} ${style}`} href={href}>
      {children}
      <span className={styles.span1}></span>
      <span className={styles.span2}></span>
      <span className={styles.span3}></span>
      <span className={styles.span4}></span>
    </a>
  );
};

export default OauthButton;
