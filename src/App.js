import logo from './logo.svg';
import Todo from './Todo';
import AddTodo from './AddTodo';
import './App.css';
import { useState, useEffect } from 'react';
import { Container, List, Paper } from '@mui/material';
import { call } from './service/ApiService';

function App() {
  const [items, setItems] = useState([
    // {
    //   id: "0",
    //   title: "Hello World 1",
    //   done: true
    // },
    // {
    //   id: "1",
    //   title: "Hello World 2",
    //   done: false
    // }
  ]); 
  
  // useEffect(() => {
  //   const requestOptions = {
  //     method: "GET",
  //     headeres: {"Content-Type": "application/json"},
  //   }

  //   fetch("http://localhost:8080/todo", requestOptions)
  //   .then((response) => response.json())
  //   .then(
  //     (response) => {
  //       setItems(response.data);
  //     },
  //     (error) => {

  //     }
  //   )
  // }, []);

  useEffect(() => {
    call("/todo", "GET", null)
    .then((response) => setItems(response.data));
  }, []);

  const addItem = (item) => {
    call("/todo", "POST", item)
    .then((response) => setItems(response.data));
  }

  const editItem = (item) => {
    call("/todo", "PUT", item)
    .then((response) => setItems(response.data));
  }

  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then((response) => setItems(response.data));
  }

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
            <Todo item={item} key={item.id} editItem={editItem} deleteItem={deleteItem}/>)
          )
        } 
      </List>
    </Paper>
  );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
