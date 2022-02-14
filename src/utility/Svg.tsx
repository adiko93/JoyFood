const SVG = (props) => {
  return (
    <svg className={props.classes} style={props.style}>
      <use href={"/icons.svg" + props.id}></use>
    </svg>
  );
};

export default SVG;
