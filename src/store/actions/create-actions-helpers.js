export const createActionObject = (type, payload) => {
  const action = {type};
  if (payload) {
    action.payload = payload;
  }
  return action;
}

export const createAction = (type) => (payload) => createActionObject(type, payload);

export const createActions = (types) => types.map(createAction);             
  
  