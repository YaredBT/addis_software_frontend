import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDark } from "../features/music/musicSlice";
import { Box, Text } from "rebass";
import { css } from "@emotion/react";

export default function MusicCard({ music }) {
  const darkMode = useSelector(selectDark);

  const linkStyle = css`
    text-transform: capitalize;
    font-size: 1.5rem;
    margin-bottom: px;
    color: ${darkMode ? "#eee" : "#333"};
    background-color: ${darkMode ? "#333" : "#eee"};
  `;

  return (
    <Box
      css={`
        padding: 1rem;
        margin-bottom: 1.5rem;
        border: 1px solid grey;
      `}
    >
      <Link to={`${music.id}`}>
        <Text css={linkStyle}>{music.title}</Text>
      </Link>
      <Box
        css={`
          display: flex;
          flex-direction: column;
          gap: 5px;
        `}
      >
        <Text>{music.artist}</Text>
        <Text># {music.genre}</Text>
      </Box>
    </Box>
  );
}
