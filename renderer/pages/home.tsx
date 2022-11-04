import { Button } from '@mui/material';
import axios from 'axios';
import React, { FunctionComponent, useState } from 'react';
import Layout from '../components/Layout';
import useLcu from '../hooks/useLcu';
import { getMatchHistory } from '../lib/lcu';

const Home: FunctionComponent = () => {

  const [history, setHistory] = useState([]);
  const { credentials } = useLcu();

  return( 
    <Layout>
      <Button onClick={async () => {
        
        const result = await getMatchHistory(credentials);
        console.log(result);

      }}>Ajouter une game</Button>
    </Layout>
  );
};

export default Home;
