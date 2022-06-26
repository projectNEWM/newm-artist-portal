import { Box, Modal, Stack, Typography } from "@mui/material";
import { FilledButton, OutlinedButton } from "elements";
interface DeleteModalProps {
  open: boolean;
  handleClose: VoidFunction;
}
export default function DeleteModal({ open, handleClose }: DeleteModalProps) {
  return (
    <Modal
      open={ open }
      onClose={ handleClose }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={ {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 512,
          borderRadius: "8px",
          bgcolor: "#1C1C1E",
        } }
      >
        <Box p={ 4 }>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Delete song
          </Typography>
          <Typography id="modal-modal-description" sx={ { mt: 2 } }>
            Are you sure you want to delete this song?
          </Typography>
        </Box>

        <Stack
          direction="row"
          p={ 3 }
          spacing={ 2 }
          sx={ {
            justifyContent: "flex-end",
            bgcolor: "#121214",
          } }
        >
          <OutlinedButton onClick={ handleClose }>Cancel</OutlinedButton>
          <FilledButton>Yes</FilledButton>
        </Stack>
      </Box>
    </Modal>
  );
}
