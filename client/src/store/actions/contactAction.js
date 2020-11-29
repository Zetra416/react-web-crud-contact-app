import baseUrl from '../../config/config.js';
const url = baseUrl;

export function getContact() {
  return (dispatch) => {
    fetch(url+'contact', {
      header: {'Content Type': 'application/json'}
    })
    .then(res => res.json())
    .then( contacts => {
      dispatch({
        type: 'SET_CONTACT',
        payload: contacts.data
      })
    })
    .catch(err => {
      console.log(err, 'failed to set contact');
    })
  }
}

export function createContact(newUser) {
  let { firstName, lastName, age, photo } = newUser;
  age = Number(age)
  return (dispatch) => {
    fetch(url+'contact', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, age, photo }),
      header: {'Content Type': 'application/json'}
    })
    .then(res => res.json())
    .then( contacts => {
      if(contacts.message === 'contact saved') {
        dispatch(
          getContact()
        )
      }
      else {
        console.log("contact not saved!", contacts)
      }
    })
    .catch(err => {
      console.log(err, 'failed to add contact');
    })
  }
}

export function updateContact(user) {
  const { id, firstName, lastName, age, photo } = user;

  return (dispatch) => {
    fetch(url+`${id}`, {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, age, photo}),
      header: {'Content Type': 'application/json'}
    })
    .then(res => res.json())
    .then( contacts => {
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: contacts.data
      })
    })
    .catch(err => {
      console.log(err, 'failed to update contact');
    })
  }
}

export function deleteContact(id) {
  console.log(id, 'id di action')
  return (dispatch) => {
    fetch(url+`contact/${id}`, {
      method: 'DELETE',
      header: {'Content Type': 'application/json'}
    })
    .then(res => res.json())
    .then( contacts => {
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id
      })
    })
    .catch(err => {
      console.log(err, 'failed to delete contact');
    })
  }
}
