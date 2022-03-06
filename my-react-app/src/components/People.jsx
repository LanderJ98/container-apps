import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const People = ({ people }) => {

  const deletePerson = async (person_id, e) => {
    e.preventDefault();
    const response = await fetch("/api/people/" + person_id, {
      method: 'DELETE'
    })
    if (response.ok) {
      console.log("Person Deleted")
    }
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.name}>
                <TableCell component="th" scope="row">{person.name}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.height}</TableCell>
                <TableCell><Button color="error" onClick={(e)=>deletePerson(person.id, e)}><DeleteIcon /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default People