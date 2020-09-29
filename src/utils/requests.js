import { getData, editMovie, addMovie, deleteMovie } from '../store/actions/actions';

const url = 'http://localhost:4000/movies';

const queryString = (query) => {
    const queryResult = Object.entries(query)
      .filter(pair => pair[1] !== undefined && pair[1] !== '')
      .reduce((acc, pair) => {
        if (pair[1] instanceof Array) {
          return [...acc, ...pair[1].map(i => [pair[0], i])];
        }
        return [...acc, pair];
      }, [])
      .map(pair => pair.filter((i) => i !== null).map(encodeURIComponent).join('='))
      .join('&');
    return queryResult ? `?${queryResult}&limit=100` : '?limit=100';
  };

export const getDataRequest = (queryObject) => dispatch => {
    fetch(`${url}${queryString(queryObject)}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        
    })
    .then(res => res.json())
    .then(res => {
        dispatch(getData(res.data))
    })
    .catch(error => alert(error))
}  

export const addMovieRequest = (body) => dispatch => {
  delete body.id;

  fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null
  })
  .then((res) => {
    console.log('add request',res) 
    if (res.status === 200) {
      dispatch(addMovie()) 
    }
  })  
  .then(() =>  alert('Movie added!'))
  .catch(error => alert(error))
}  

export const editMovieRequest = (body) => dispatch => {
  fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null
  })
  .then((res) => { 
    console.log('edit request',res) 
    alert('Movie edited!')
    dispatch(editMovie()) 
  })
  .catch(error => alert(error))
}  
  
export const deleteMovieRequest = (id) => dispatch => {
  fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
  })
  .then((res) => {
    console.log('delete request',res) 
    alert('Movie deleted!')
    dispatch(deleteMovie())
  })
  .catch(error => alert(error))
}  