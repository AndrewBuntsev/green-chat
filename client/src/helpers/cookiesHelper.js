import Cookies from 'universal-cookie';
import * as COOKIES from '../const/cookies';

const cookies = new Cookies();

export const getClietnId = () => cookies.get(COOKIES.CLIENT_ID);
export const setClietnId = clientId => cookies.set(COOKIES.CLIENT_ID, clientId);