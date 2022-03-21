import SVG from "../../utility/Svg";

export default function Spinner({ small }: { small: boolean }) {
  const state = small ? (
    <div className="spinner_small">
      <SVG id="#icon-loader" />
    </div>
  ) : (
    <div className="spinner">
      <SVG id="#icon-loader" />
    </div>
  );
  return state;
}
