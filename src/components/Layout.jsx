import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "rebass";
import { useSelector } from "react-redux";
import { selectDark } from "../features/music/musicSlice";
import { css } from "@emotion/react";

export default function Layout() {
  const darkMode = useSelector(selectDark);

  const layoutStyle = css`
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    ${darkMode
      ? { backgroundColor: "#333", color: "#eee" }
      : { backgroundColor: "#eee", color: "#333" }};
  `;

  return (
    <Box css={layoutStyle}>
      <Header />
      <Box
        css={`
          flex: 1;
          padding: 1rem;
          width: 90%;
          max-width: 800px;
          margin: auto;
        `}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
