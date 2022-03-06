import { Container, Grid, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import AddIcon from '@mui/icons-material/Add';
import PersonForm from './components/PersonForm';
import People from './components/People';


function App() {

  let [people, setPeople] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
     const response = await fetch("/api/people", {
       method: 'GET'
     });
     people = await response.json()
     setPeople(people);
    })();
   }, []);
    
  if (people.length === 0) {
    return (
      <div className="App">
        <NavBar />
        <Box mb={4} />
        <Container>
          <Grid container>
            <h1>No information to display</h1>
          </Grid>
          <Button color="success" onClick={handleOpen}><AddIcon/></Button>
          <PersonForm open={open} handleClose={handleClose}/>
          <Box mt={4}/>
          <hr></hr>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="App">
        <NavBar />
        <Box mb={4} />
        <Container>
          <Grid container>
            <People people={people} />
          </Grid>
          <Button color="success" onClick={handleOpen}><AddIcon/></Button>
          <PersonForm open={open} handleClose={handleClose}/>
          <Box mt={4}/>
          <hr></hr>
        </Container>
      </div>
    );
  }
}

export default App;
