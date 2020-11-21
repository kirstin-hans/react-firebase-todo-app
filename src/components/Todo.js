import { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Modal,
  Input
} from "@material-ui/core";
import { Delete, Edit, Close, Save } from "@material-ui/icons";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";

const userStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    //position: "absolute",
    //width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4),
    outline: "none",
    focus: {
      outline: "none"
    }
  }
}));

function Todo(props) {
  const classes = userStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos").doc(props.id).set(
      {
        todo: input
      },
      { merge: true }
    );
    setOpen(false);
  };

  const editTodo = () => {
    setInput(props.text);
    setOpen(true);
  };

  return (
    <>
      <Modal
        className={classes.modal}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <div className={classes.paper}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="my-input"
            aria-describedby="my-helper-text"
          />
          <Save onClick={updateTodo} />
          <Close onClick={(e) => setOpen(false)} />
        </div>
      </Modal>
      {/* <List> */}
      <ListItem key={props.id}>
        <ListItemIcon>
          <Checkbox />
        </ListItemIcon>
        <ListItemText primary={props.text}></ListItemText>
        <Edit onClick={editTodo} />
        <Delete
          onClick={(e) => db.collection("todos").doc(props.id).delete()}
        />
      </ListItem>
      {/* </List> */}
    </>
  );
}

export default Todo;
