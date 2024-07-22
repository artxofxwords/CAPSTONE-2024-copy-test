import { createContext } from "react";

const contextProvider = createContext({
  context: {
    userData: null,
    proposalData: null
  },
  setUserContext: () => {},
});

export default contextProvider;