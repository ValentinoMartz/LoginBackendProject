import * as React from "react";

import {
  Box,
  Fab,
  Tooltip,
  TextField,
  Typography,
  Modal,
  Button,
  FormGroup,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postNote } from "../redux/actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

/* const styleModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}); */

export default function BasicModal() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [input, setInput] = useState({
    titulo: "",
    descripcion: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postNote(input));
    // history("/");
    // window.location.reload();
  }

  return (
    <Box textAlign="center" mt={6}>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Agregar una nota"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup sx={style}>
            <Typography
              variant="h6"
              fontWeight="400"
              color="initial"
              textAlign="center"
            >
              Agrega tu nota <NoteAddIcon />
            </Typography>
            <TextField
              id="demo-helper-text-aligned"
              label="Titulo"
              type="text"
              name="titulo"
              value={input.titulo}
              onChange={(e) => handleChange(e)}
              sx={{ width: "100%", marginTop: 2 }}
            />

            <TextField
              id="demo-helper-text-aligned"
              label="Descripcion"
              type="text"
              name="descripcion"
              value={input.descripcion}
              onChange={(e) => handleChange(e)}
              sx={{
                width: "100%",
                marginTop: 2,
              }}
              multiline
            />
            {/* <TextField
            id="demo-helper-text-aligned"
            label="Tags"
            sx={{ width: "100%", marginTop: 2 }}
          /> */}
            <Button
              variant="outlined"
              endIcon={<SaveIcon />}
              type="submit"
              sx={{
                display: "flex",
                marginTop: 2,
              }}
              fullWidth
            >
              Guardar
            </Button>
          </FormGroup>
        </form>
      </Modal>
    </Box>
  );
}
