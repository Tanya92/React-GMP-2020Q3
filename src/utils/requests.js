import { getData } from '../store/actions/actions';

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
  