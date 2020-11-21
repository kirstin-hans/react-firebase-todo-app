import { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Todo from "./components/Todo";
import { db } from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //setTodos(snapshot.docs.map((doc) => doc.data().todo));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    //setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Write a todo</InputLabel>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="my-input"
            aria-describedby="my-helper-text"
          />
        </FormControl>

        {/* <input value={input} onChange={e => setInput(e.target.value)} /> */}
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>Add Todo</button> */}
      </form>
      <ul>
        {todos.map((item) => (
          <Todo text={item.todo} id={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;
