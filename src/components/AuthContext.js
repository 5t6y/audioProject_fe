import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { CreateAccount } from "./Account_dataHandle"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useLocalStorage("user");
  const [userToken, setUserToken] = useLocalStorage("token");
  const [userSessionToken, setUserSessionToken] = useSessionStorage("token");
  const [allUser, setAllUser] = useState([]);

  const login = async (data) => {
    try {
      const response = await fetch("http://localhost:5555/user/authenticateLogin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (!res.authenticateStatus) {
        alert(res.message);
      }
      else {
        if (data.stayLogin) {
          setUserToken(res.jwt);
        }
        setUser(data.username);
        setUserSessionToken(res.jwt);
        history.push('/home');
        return;
      }
      throw new Error(res);
    } catch (err) {
      console.error(err);
    }
  }

  const logout = async (data) => {
    setUser(null);
    setUserToken(null);
    history.replace('/logout');
  }

  const signup = async (data) => {
    try {
      const response = await fetch("http://localhost:5555/user/SignUpNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.StatusObj.State) {
        alert('Create account sucess');
        history.push('/login');
      }
      setAllUser(res);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
