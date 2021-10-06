import React, { createContext, useReducer } from 'react';
import produce from 'immer';
import { getFoundPetsAPI, getLostPetsAPI } from '../api';

const initialState = {
  status: 'idle',
  currentFilter: 'found',
  postings: [],
  user: null,
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
      draft.currentFilter = action.currentFilter;
      break;
    }
    case 'SET-POSTINGS-ERROR': {
      draft.status = 'error';
      break;
    }
    case 'SET-USER': {
      draft.user = action.user;
      break;
    }
    case 'REMOVE-USER': {
      draft.user = null;
      break;
    }
    default:
      throw new Error(`The action "${action.type}" doesn't exist`);
  }
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // actions
  const setPostingsRequest = () => dispatch({ type: 'SET-POSTINGS-REQUEST' });
  const setPostingsSuccess = (data) =>
    dispatch({ type: 'SET-POSTINGS-SUCCESS', ...data });
  const setPostingsError = () => dispatch({ type: 'SET-POSTINGS-ERROR' });
  const setUser = (data) => dispatch({ type: 'SET-USER', ...data });
  const removeUser = () => dispatch({ type: 'REMOVE-USER' });

  // thunks
  const getFoundPets = async () => {
    setPostingsRequest();

    try {
      const response = await getFoundPetsAPI();

      if (response.ok) {
        setPostingsSuccess({ postings: response.data, currentFilter: 'found' });
      } else {
        setPostingsError();
      }
    } catch (er) {
      setPostingsError();
      console.log(er);
    }
  };

  const getLostPets = async () => {
    setPostingsRequest();

    try {
      const response = await getLostPetsAPI();

      if (response.ok) {
        setPostingsSuccess({ postings: response.data, currentFilter: 'lost' });
      } else {
        setPostingsError();
      }
    } catch (er) {
      setPostingsError();
      console.log(er);
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        actions: {
          setPostingsRequest,
          setPostingsSuccess,
          setPostingsError,
          setUser,
          removeUser,
        },
        thunks: { getFoundPets, getLostPets },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
