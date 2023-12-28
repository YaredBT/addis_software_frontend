import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MusicList from "./features/music/MusicList";
import SingleMusic from "./features/music/SingleMusic";
import AddMusic from "./features/music/AddMusic";
import EditMusic from "./features/music/EditMusic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="musics">
            <Route index element={<MusicList />} />
            <Route path="add" element={<AddMusic />} />
            <Route path="edit/:id" element={<EditMusic />} />
            <Route path=":id" element={<SingleMusic />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
