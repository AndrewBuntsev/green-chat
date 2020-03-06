import React from 'react';
import Cookies from 'universal-cookie';

import './App.css';
import * as COOKIES from './const/cookies';
import * as api from './api';
import * as responseStatus from './const/responseStatus';
import MainContainer from './components/MainContainer';
import SignUp from './components/SignUp';

const cookies = new Cookies();

export default class App extends React.Component {
  async componentDidMount() {
    const clientId = cookies.get(COOKIES.CLIENT_ID);
    if (clientId) {
      const client = await api.getClient(clientId);
      if (client && client.status == responseStatus.SUCCESS && client.payload) {
        //todo: set client data to store
        return;
      }
    }

    // display the SignUp screen
  }

  render() {
    return (
      <div className="App">
        <MainContainer />
      </div>
    );
  }
}
