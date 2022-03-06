import {Dialog, DialogActions, DialogContent} from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';

const PersonForm = ({open, handleClose}) => {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      height: '',
    },
    onSubmit: async(values) => {
      console.log(values)
      const response = await fetch("/api/people", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json,multipart/form-data'
        },
        body: JSON.stringify(values)
      })
      if (response.ok) {
        console.log("It worked")
      }
    },
  })
    
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField name="name" variant="standard" id="name" label="Name" value={formik.values.name} onChange={formik.handleChange}/>
            <TextField name="email" variant="standard" id="email" label="Email" type="email" value={formik.values.email} onChange={formik.handleChange}/>
            <TextField name="height" variant="standard" id="height" label="Height" value={formik.values.height} onChange={formik.handleChange}/>
            <DialogActions>
              <Button type="submit" onClick={handleClose}>Add</Button>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
            </form>
          </DialogContent>
      </Dialog>
    </>
  )
}

export default PersonForm