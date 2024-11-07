"use client";
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { authReducer } from "@/reducers/authReducers";
import { createContext, useContext, useMemo, useReducer } from "react";

export const initialState = {
  toggle: false,
  loading: false,
  showPosts: false,
  showComments: false,
  messages: [],
  loggedUser: {},
  chat: {},
};

const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [userState, setUserState] = useReducer(authReducer, initialState);
  const value = useMemo(() => {
    return { userState, setUserState };
  }, [userState]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
// PropTypes validation for the children prop
GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a valid React node
};
