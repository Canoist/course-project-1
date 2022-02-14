import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/userService";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(10, 50) / 10,
        comletedMeetings: randomInt(0, 200),
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким E-mail уже существует"
          };
          throw errorObject;
        }
      }
    }
  }
  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      console.log(content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      getUserData();
      if (data.registered) {
        toast.success(`Welcome ${currentUser.name}!`);
      }
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "INVALID_PASSWORD" || message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Неверно введен пароль или E-mail",
            password: "Неверно введен пароль или E-mail"
          };
          throw errorObject;
        }
      }
    }
  }

  function errorCatcher(error) {
    const message = error.response.data;
    setError(message);
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
