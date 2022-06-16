import { Box, Stack, useTheme } from "@mui/material";
import { Switch, Typography } from "elements";
import { FunctionComponent, useEffect, useState } from "react";
import {
  enableWallet,
  getBalance,
  getUtxos,
  selectWallet,
  setWalletErrorMessage,
  setWalletName,
} from "modules/wallet";
import { useDispatch, useSelector } from "react-redux";
import { FormikValues, useFormikContext } from "formik";
import MintSongModal from "./MintSongModal";

const MintSong: FunctionComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { values, setFieldValue } = useFormikContext<FormikValues>();

  const { walletName } = useSelector(selectWallet);

  /**
   * Select a wallet, enable it, and update the
   * window Wallet object with the wallet API.
   */
  const handleSelectWallet = async (walletName: string) => {
    let isEnabled = false;

    try {
      isEnabled = await enableWallet(walletName);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setWalletErrorMessage(error.message));
      }
    }

    if (isEnabled) {
      setFieldValue("isMinting", true);
    }

    dispatch(setWalletName(walletName));
    setIsModalOpen(false);

    const balance = await getBalance(walletName);

    console.log("balance: ", balance);

    const utxos = await getUtxos(walletName);

    console.log("utxos: ", utxos);
  };

  return (
    <>
      <Box
        sx={ {
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-between",
          alignItems: ["center", "center", "flex-start"],
          flexWrap: "nowrap",
          backgroundColor: theme.colors.grey600,
          padding: theme.spacing(3),
        } }
      >
        <Stack
          direction="column"
          spacing={ 1 }
          sx={ { width: "85%", maxWidth: theme.spacing(45) } }
        >
          <Typography>MINT SONG</Typography>
          <Typography variant="subtitle1" fontSize={ 12 }>
            Minting a song will make it an NFT, becoming a uniquely publishing
            token on the blockchain to make it purchasable.
          </Typography>
        </Stack>

        <Switch
          sx={ {
            marginTop: [theme.spacing(2), theme.spacing(2), 0],
          } }
          value={ isModalOpen ? "on" : "off" }
          checked={ values.isMinting }
          onChange={ (event) => {
            setIsModalOpen(event.target.value === "off");
          } }
        />
      </Box>

      <MintSongModal
        open={ isModalOpen }
        onConfirm={ handleSelectWallet }
        onCancel={ () => {
          setIsModalOpen(false);
          setFieldValue("isMinting", false);
        } }
        onClose={ () => {
          setIsModalOpen(false);
        } }
      />
    </>
  );
};

export default MintSong;