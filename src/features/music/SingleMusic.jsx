import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { deleteMusic, selectDark, selectMusicById } from "./musicSlice";
import { Button, Box, Text } from "rebass";
import { css } from "@emotion/react";

export default function SingleMusic() {
  const darkMode = useSelector(selectDark);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const music = useSelector((state) => selectMusicById(state, Number(id)));

  if (!music) {
    return <Box>Loading...</Box>;
  }

  const handleDelete = () => {
    dispatch(deleteMusic(Number(id)));
    navigate("/musics");
  };

  const textStyle = css`
    font-size: 1.2rem;
    text-transform: capitalize;
  `;
  const editButtonStyle = css`
    text-decoration: underline;
    color: ${darkMode ? "#333" : "#eee"};
    background-color: ${darkMode ? "#eee" : "#333"};
    &:hover {
      color: #eee;
      cursor: pointer;
      background-color: green;
    }
  `;
  const deleteButtonStyle = css`
    color: ${darkMode ? "#333" : "#eee"};
    background-color: ${darkMode ? "#eee" : "#333"};
    &:hover {
      cursor: pointer;
      background-color: red;
    }
  `;

  return (
    <Box>
      <Text
        css={`
          font-size: 2rem;
          text-transform: capitalize;
          margin-bottom: 1rem;
        `}
      >
        Music Title: {music.title}
      </Text>
      <Box
        css={`
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 1rem;
        `}
      >
        <Text css={textStyle}>Artist: {music.artist}</Text>
        <Text css={textStyle}>Music Genre: {music.genre}</Text>
        <Text css={textStyle}>Duration: {music.duration}</Text>
      </Box>
      <Box
        css={`
          display: flex;
          gap: 5px;
        `}
      >
        <Link to={`/musics/edit/${music.id}`}>
          <Button css={editButtonStyle}>Edit Music</Button>
        </Link>
        <Button onClick={handleDelete} css={deleteButtonStyle}>
          Delete Music
        </Button>
      </Box>
    </Box>
  );
}
