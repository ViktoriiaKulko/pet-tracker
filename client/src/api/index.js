import { client } from './api-client';

export const getFoundPetsAPI = () => client('/postings/found');
export const getLostPetsAPI = () => client('/postings/lost');
export const getPetAPI = (_id, action) => client(`/postings/${_id}/${action}`);
export const addPostingAPI = (body) =>
  client('/postings', { method: 'POST', body });
export const removePostingAPI = (body) =>
  client('/postings', { method: 'PATCH', body });
export const getUserAPI = (email) => client(`/user/${email}`);
