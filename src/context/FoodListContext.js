import React, { createContext, useEffect, useReducer } from "react";

import { reducer, initialState } from "../reducer/reducer";

export const FoodListContext = createContext();
export const FoodListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();

      dispatch({
        type: "FETCH_SUCCESSFUL_HOME_DATA",
        payload: data.categories,
      });
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();

      dispatch({
        type: "FETCH_SUCCESSFUL_ALL_FOODLIST_DATA",
        payload: data.products,
      });
    };
    getData();
  }, []);

  return (
    <FoodListContext.Provider value={{ state, dispatch }}>
      {children}
    </FoodListContext.Provider>
  );
};
