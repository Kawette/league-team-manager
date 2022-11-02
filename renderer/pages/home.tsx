import { Button } from '@material-ui/core';
import axios from 'axios';
import { ipcRenderer } from 'electron';
import React, { FunctionComponent, useEffect, useState } from 'react';

interface LCUCredentials {
  address: string;
  port: number;
  username: string;
  password: string;
  protocol: string;
}

const Home: FunctionComponent = () => {

  const [credentials, setCredentials] = useState<LCUCredentials>(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    ipcRenderer.on('lcu-credentials', (event, credentials) => {
      console.log(`LCU received credentials: ${JSON.stringify(credentials)}`);
      setCredentials(credentials);
    });
    ipcRenderer.send('lcu-ready');
  }, []);

  return (
    <>
      {JSON.stringify(credentials)}
      <Button onClick={() => {
        axios.get(`${credentials.protocol}://${credentials.address}:${credentials.port}/lol-match-history/v1/products/lol/current-summoner/matches`, {
          auth: {
            username: credentials.username,
            password: credentials.password
          }
        }).then((response) => {
          console.log(response.data);
          setHistory(response.data);
        });
      }}>
        Fetch history
      </Button>
      {JSON.stringify(history)}
    </>
  );
};

export default Home;
