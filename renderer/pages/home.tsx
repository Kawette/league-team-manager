import axios from 'axios';
import React, { FunctionComponent, useState } from 'react';
import Layout from '../components/Layout';
import Button from '@mui/material/Button';

const Home: FunctionComponent = () => {

  const [history, setHistory] = useState([]);
  
  return( 
    <Layout>
      {/*
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
        */}
        {JSON.stringify(history)}
    </Layout>
  );
};

export default Home;
