import { useSelector } from "react-redux";
import { selectAllMusic } from "./musicSlice";
import MusicCard from "../../components/MusicCard";

export default function MusicList() {
  const musics = useSelector(selectAllMusic);

  return (
    <div>
      {musics.map((music) => (
        <MusicCard key={music.id} music={music} />
      ))}
    </div>
  );
}
