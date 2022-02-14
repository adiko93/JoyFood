import style from "../../styles/UI/OauthButton.module.css";

export default function OauthButton(props) {
  let color = style.facebook;

  switch (props.color) {
    case "google":
      color = style.google;
  }

  return (
    <a className={`${style.link} ${color} ${props.style}`} href={props.href}>
      {props.children}
      <span className={style.span1}></span>
      <span className={style.span2}></span>
      <span className={style.span3}></span>
      <span className={style.span4}></span>
    </a>
  );
}

{
  /* <div class={`${style.glass_btn} ${color} ${props.style}`}>
     
</div> */
}
