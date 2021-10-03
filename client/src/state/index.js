import React, { createContext, useReducer } from 'react';
import produce from 'immer';

const initialState = {
  status: 'idle',
  postings: [],
};

export const AppContext = createContext();

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'SET-POSTINGS-REQUEST': {
      draft.status = 'awaiting-response';
      break;
    }
    case 'SET-POSTINGS-SUCCESS': {
      draft.postings = action.postings;
      draft.status = 'success';
      break;
    }
    case 'SET-POSTINGS-ERROR': {
      draft.status = 'error';
      break;
    }
    default:
      throw new Error(`The action "${action.type}" doesn't exist`);
  }
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPostingsRequest = () => dispatch({ type: 'SET-POSTINGS-REQUEST' });
  const setPostingsSuccess = (data) =>
    dispatch({ type: 'SET-POSTINGS-SUCCESS', ...data });
  const setPostingsError = () => dispatch({ type: 'SET-POSTINGS-ERROR' });

  return (
    <AppContext.Provider
      value={{
        state,
        actions: { setPostingsRequest, setPostingsSuccess, setPostingsError },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
