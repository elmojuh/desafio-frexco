import "@fontsource/roboto";

function GlobalStyle() {
  return (
    <>
      <style global jsx>{`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
          text-decoration: none;
        }
        body {
          font-family: roboto;
        }
      `}</style>
    </>
  );
}

export default GlobalStyle;
