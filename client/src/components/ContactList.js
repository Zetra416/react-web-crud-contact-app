import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getContact,
  createContact,
  updateContact,
  deleteContact
 } from '../store/actions/contactAction';

// import PropTypes from 'prop-types';
// import clsx from 'clsx';
import {
  // lighten,
  makeStyles,
  useTheme,
  //fade,
  Container,
  AppBar,
  Button,
  // Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  // TableSortLabel,
  TableFooter,
  Toolbar,
  Typography,
  Paper,
  // Checkbox,
  IconButton,
  Tooltip,
  // FormControlLabel,
  // Switch,
  Avatar,
  Modal,
 } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
// eslint-disable-next-line
import AddIcon from '@material-ui/icons/Add';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import EditIcon from '@material-ui/icons/Edit';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
  },
  root1: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  paper: {
   position: 'absolute',
   width: 400,
   backgroundColor: theme.palette.background.paper,
   border: '2px solid #000',
   boxShadow: theme.shadows[5],
   padding: theme.spacing(2, 4, 3),
 },
 formAdd: {
   marginTop: 40,
   marginLeft: '30%',
   position: 'absolute',
   width: 400,
   backgroundColor: theme.palette.background.paper,
   border: '2px solid #000',
   boxShadow: theme.shadows[5],
   padding: theme.spacing(2, 4, 3),
 },
 button: {
   padding: 10,
   marginTop: 20,
   marginRight: 20
 }
}));

  const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

export default function ContactList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactReducer.data)
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, contacts.length - page * rowsPerPage);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };

   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [age, setAge] = useState('')
   const [photo, setPhoto] = useState('')

   const handleSubmit = (e) => {
     if( firstName === '' ||  lastName === '' || age === '' || photo === '' ) {
       console.log('data missing!')
     }
     else if( typeof(Number(age)) != 'number') {
       console.log('Age must be number!')
     }
     else {
       dispatch(
         createContact({firstName, lastName, age, photo})
       )
       handleClose()
     }
   }

   const handleSubmitEdit = (e) => {
     if( firstName === '' ||  lastName === '' || age === '' || photo === '' ) {
       console.log('data missing!')
     }
     else if( typeof(Number(age)) != 'number') {
       console.log('Age must be number!')
     }
     else {
       dispatch(
         updateContact({firstName, lastName, age, photo})
       )
       handleClose()
     }
   }

   const body = (
     <form className={classes.formAdd} noValidate autoComplete="off"  >
      <TextField id="standard-basic" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField id="standard-basic" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <TextField id="standard-basic" label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <TextField id="standard-basic" label="Photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
      <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>
        Confirm
      </Button>
      <Button className={classes.button} variant="contained" color="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </form>
  );

  // const bodyEdit = (
  //   <form className={classes.formAdd} noValidate autoComplete="off"  >
  //    <TextField id="standard-basic" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
  //    <TextField id="standard-basic" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
  //    <TextField id="standard-basic" label="Age" value={age} onChange={(e) => setAge(e.target.value)} />
  //    <TextField id="standard-basic" label="Photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
  //    <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmitEdit}>
  //      Confirm
  //    </Button>
  //    <Button className={classes.button} variant="contained" color="secondary" onClick={handleClose}>
  //      Cancel
  //    </Button>
  //  </form>
  // )

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect( ()=> {
    if(contacts.length === 0) {
      dispatch(
        getContact()
      )
    }
    // eslint-disable-next-line
  }, [contacts])

  return (
    <Container>
    <AppBar position="static">
      <Toolbar>
      <Tooltip title="Add" >
        <IconButton aria-label="add" >
          <div>
          <AddCircleTwoToneIcon onClick={handleOpen}/>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              >
              {body}
            </Modal>
          </div>
        </IconButton>
      </Tooltip>
        <Typography className={classes.title} variant="h6" noWrap>
          SIMPLE-CONTACT-WEB
        </Typography>
      </Toolbar>
    </AppBar>


      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="table">

          <TableHead>
            <TableRow>
              <TableCell align="center" style={{fontWeight: 'bold', fontSize: 20}}>Photo</TableCell>
              <TableCell align="center" style={{fontWeight: 'bold', fontSize: 20}}>First Name</TableCell>
              <TableCell align="center" style={{fontWeight: 'bold', fontSize: 20}}>Last Name</TableCell>
              <TableCell align="center" style={{fontWeight: 'bold', fontSize: 20}}>Age</TableCell>
              <TableCell align="center" style={{fontWeight: 'bold', fontSize: 20}}>Option</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
            ? contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : contacts)
            .map((contact, id) => (
              <TableRow key={id}>
                <TableCell style={{paddingLeft: 180}}>
                  <Avatar  alt={contact.firstName} src={contact.photo} />
                </TableCell>
                <TableCell align="center">{contact.firstName}</TableCell>
                <TableCell align="center">{contact.lastName}</TableCell>
                <TableCell align="center">{contact.age}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={()=> {dispatch(deleteContact(contact.id))}}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit" >
                      <EditIcon />
                      
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
         <TableRow>
           <TablePagination
             rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
             colSpan={3}
             count={contacts.length}
             rowsPerPage={rowsPerPage}
             page={page}
             SelectProps={{
               inputProps: { 'aria-label': 'contacts per page' },
               native: true,
             }}
             onChangePage={handleChangePage}
             onChangeRowsPerPage={handleChangeRowsPerPage}
             ActionsComponent={TablePaginationActions}
           />
         </TableRow>
       </TableFooter>

        </Table>
      </TableContainer>
    </Container>
  )
}
