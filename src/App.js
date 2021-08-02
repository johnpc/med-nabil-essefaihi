import logo from './logo.svg';
import './App.css';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import * as queries from './graphql/queries';
Amplify.configure(awsExports);

function App() {
  const [apiResponse, setApiResponse] = useState()
  useEffect(() => {
    const setupState = async () => {
      const res = await API.graphql({
        query: queries.listUsers,
        authMode: 'AWS_IAM'
      });
      setApiResponse(res);
    }
    setupState()
  }, []);
  if (!apiResponse) return <>loading...</>
  return <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
}

export default App;
