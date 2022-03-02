import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppSelector } from "common";
import Popup from "components/Popup";
import { History } from "history";
import { selectSongs } from "modules/song";
import { useState } from "react";
import theme from "theme";
import PartyStarter from "./PartyStarter";
import SongGrid from "./SongGrid";
import SongList from "./SongList";
import SongUploadForm from "./SongUploadForm";


export interface SongsProps {
  history: History;
}

const Songs = ({ history }: SongsProps) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const songs = useAppSelector(selectSongs);

  const [openPopup, setOpenPopup] = useState(false);

  if (Object.values(songs).length === 0) {
    return <PartyStarter />;
  }

  return (
    <>
      <Popup
        height="522px"
        openPopup={ openPopup }
        setOpenPopup={ setOpenPopup }
      >
        <SongUploadForm setOpenPopup={ setOpenPopup } />
      </Popup>

      <Box pb={ 2 }>
        {/* <SongGrid
          history= { history }
          setOpenPopup={ setOpenPopup }
        /> */}
        <SongList />
      </Box>
    </>
  );
};

export default Songs;
