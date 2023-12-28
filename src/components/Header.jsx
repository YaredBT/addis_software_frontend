import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectDark, toggleDarkMode } from "../features/music/musicSlice";
import { css } from "@emotion/react";
import { Flex, Box, Button, Text } from "rebass";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const darkMode = useSelector(selectDark);
  const dispatch = useDispatch();

  const handleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const headerStyle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid grey;
  `;

  const navigationStyle = css`
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const linkStyle = css`
    font-size: 1.5rem;
    color: ${darkMode ? "#eee" : "#333"};
    background-color: ${darkMode ? "#333" : "#eee"};
  `;

  const button = (
    <Button
      onClick={handleDarkMode}
      css={css`
        font-size: 2rem;
        cursor: pointer;
        color: ${darkMode ? "#eee" : "#333"};
        background-color: ${darkMode ? "#333" : "#eee"};
      `}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </Button>
  );

  return (
    <Box css={headerStyle}>
      <Flex css={navigationStyle}>
        <Link to="/">
          <Text css={linkStyle}>Home</Text>
        </Link>
        <Link to="/musics">
          <Text css={linkStyle}>Musics</Text>
        </Link>
        <Link to="/musics/add">
          <Text css={linkStyle}>Add</Text>
        </Link>
      </Flex>

      {button}
    </Box>
  );
}
