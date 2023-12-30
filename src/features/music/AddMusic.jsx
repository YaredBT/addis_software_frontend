import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMusic, selectDark } from "./musicSlice";
import { css } from "@emotion/react";
import { Box, Button } from "rebass";
import { Input, Label } from "@rebass/forms";

export default function AddMusic() {
  const darkMode = useSelector(selectDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (isFormValid()) {
      dispatch(createMusic(formData));
      navigate("/musics");
      setFormData({
        title: "",
        artist: "",
        genre: "",
        duration: "",
      });
    } else {
      console.log("Invalid form data");
    }
  };

  const boxStyle = css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  `;
  const labelStyle = css`
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

  return (
    <form onSubmit={handleSubmit}>
      <Box css={boxStyle}>
        <Label htmlFor="title" css={labelStyle}>
          Title
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="title"
          name="title"
          placeholder="Enter Music Title"
          value={formData.title}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Label htmlFor="artist" css={labelStyle}>
          Artist
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="artist"
          name="artist"
          placeholder="Enter Artist Name"
          value={formData.artist}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Label htmlFor="genre" css={labelStyle}>
          Genre
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="genre"
          name="genre"
          placeholder="Enter Music Genre"
          value={formData.genre}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Label htmlFor="duration" css={labelStyle}>
          Duration
        </Label>
        <Input
          css={inputStyle}
          type="text"
          id="duration"
          name="duration"
          placeholder="Enter Music Duration(03:34)"
          value={formData.duration}
          onChange={onInputChange}
        />
      </Box>
      <Box css={boxStyle}>
        <Button css={buttonStyle} disabled={!isFormValid()}>
          Add Music
        </Button>
      </Box>
    </form>
  );
}
