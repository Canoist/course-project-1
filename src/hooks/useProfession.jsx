import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/professionService";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const PropfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function getProfession(id) {
    return professions.find((item) => item._id === id);
  }

  function errorCatcher(error) {
    const message = error.response.data;
    setError(message);
  }

  return (
    <ProfessionContext.Provider
      value={{ isLoading, professions, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

PropfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
