import { client } from './api-client';

export const getFoundPetsAPI = () => client('/postings/found');
export const getLostPetsAPI = () => client('/postings/lost');
