import { CSSProperties } from "react";

const SVG = ({
  classes,
  style,
  id,
}: {
  classes?: string;
  style?: CSSProperties;
  id: string;
}) => {
  return (
    <svg className={classes} style={style}>
      <use href={"/icons.svg" + id}></use>
    </svg>
  );
};

export default SVG;
