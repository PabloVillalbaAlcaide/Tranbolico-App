import "./ButtonTram.scss";

const getHoverColor = (backgroundColor) => {
  const hoverColors = {
    "#283583": "#1e2a66",
    "#e72957": "#bf2147",
    "#e3b6d4": "#c99daf",
    "#91cad8": "#118899",
    "#ffd92d": "#e6c226",
    "#b3b420": "#9da01d",
    "var(--tranbolico-rosa)": "#c99daf",
    "var(--tranbolico-azul)": "#1e2a66",
    "var(--tranbolico-azulClaro)": "#118899",
    "var(--tranbolico-fucsia)": "#bf2147",
    "var(--tranbolico-amarillo)": "#e6c226",
    "var(--tranbolico-verde)": "#9da01d",
  };

  return hoverColors[backgroundColor] || backgroundColor;
};

export const ButtonTram = ({
  fontSize = "1.8rem",
  color = "white",
  borderRadius = "1rem",
  padding = "10px 35px",
  minWidth = "120px",
  backgroundColor = "var(--tranbolico-azulClaro)",
  children,
  ...props
}) => {
  const hoverBackgroundColor = getHoverColor(backgroundColor);

  const buttonStyles = {
    fontSize,
    color,
    borderRadius,
    padding,
    minWidth,
    "--background-color": backgroundColor,
    "--hover-background-color": hoverBackgroundColor,
  };

  return (
    <button className="button-tram" style={buttonStyles} {...props}>
      {children}
    </button>
  );
};
