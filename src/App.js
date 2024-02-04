import logo from './logo.svg';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Loading from './Loading';
import './App.css';
import { useState, useEffect } from 'react';
import { Container, List, Paper, AppBar, Grid, Button, Toolbar, Typography } from '@mui/material';
import { call, signout } from './service/ApiService';

function App() {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call("/todo", "GET", null)
    .then((response) => {
      setItems(response.data);
      setLoading(false);
    });
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

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant='h6'>To-do List</Typography>
          </Grid>
          <Grid item>
            <Button color='inherit' raised onClick={signout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );

  let content = <Loading />;

  if (!loading) {
    content = todoListPage;
  }

  return <div className="App">{content}</div>;
}

export default App;
