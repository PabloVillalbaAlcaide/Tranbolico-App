import "./scrollTopButton.scss";

export const ScrollTopButton = () => {
  const scrollTotop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <span onClick={scrollTotop} className="go-to-top position-fixed">
        🔝
      </span>
    </>
  );
};
