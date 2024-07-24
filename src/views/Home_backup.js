import React, { useEffect, useState } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorage";
import Navbar from "../components/Navbar";
import Account from "./AccountManagement";
import Audio from "./AudioManagement";

const Home = () => {
  const [user, setUser] = useLocalStorage("user");
  const [page, setPage] = useState('');

  useEffect(() => {
    console.info("page", page)
  }, [page]);

  return (
    <div>
      <h1>Hi, {user}</h1>
      <Navbar gotoPage={setPage} />
      {
        page==='account'? <Account /> : (page==='audio'? <Audio /> : <span />)
      }
    </div>
  );
};

export default Home;
