import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateMusic,
  fetchMusic,
  selectMusicById,
  selectDark,
} from "./musicSlice";
import { css } from "@emotion/react";
import { Box, Button } from "rebass";
import { Input, Label } from "@rebass/forms";

export default function EditMusic() {
  const darkMode = useSelector(selectDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const music = useSelector((state) => selectMusicById(state, Number(id)));

  useEffect(() => {
    if (!music) {
      dispatch(fetchMusic());
    } else {
      setFormData({
        title: music.title || "",
        artist: music.artist || "",
        genre: music.genre || "",
        duration: music.duration || "",
      });
    }
  }, [dispatch, music]);

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    duration: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.artist.trim() !== "" &&
      formData.genre.trim() !== "" &&
      /^(0\d|[1-9]):[0-5]\d$/.test(formData.duration) // Check for the format "NN:NN"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMusic({ id, ...formData }));
    navigate("/musics");
    setFormData({
      title: "",
      artist: "",
      genre: "",
      duration: "",
    });
  };

  const boxStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  `;
  const LabelStyle = css`
    position: absolute;
    left: -1000rem;
  `;
  const inputStyle = css`
    border: none;
    border-bottom: 1px solid grey;
    outline: none;
    &:focus {
      font-size: 105%;
    }
  `;
  const buttonStyle = css`
    background-color: ${darkMode ? "#eee" : "#333"};
    color: ${darkMode ? "#333" : "#eee"};
    margin-top: 1rem;
    &:hover {
      cursor: ${isFormValid() ? "pointer" : "not-allowed"};
      color: ${darkMode ? "#222" : "#fff"};
      background-color: ${darkMode ? "#fff" : "#222"};
    }
    &:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
    }
  `;

  if (!music) {
    return <Box css={boxStyle}>Loading...</Box>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box css={boxStyle}>
        <Label htmlFor="title" css={LabelStyle}>
          Title
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Label htmlFor="artist" css={LabelStyle}>
          Artist
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Label htmlFor="genre" css={LabelStyle}>
          Genre
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Label htmlFor="duration" css={LabelStyle}>
          Duration
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Button css={buttonStyle} disabled={!isFormValid()}>
          Edit Music
        </Button>
      </Box>
    </form>
  );
}
