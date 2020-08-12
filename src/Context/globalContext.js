import React, { createContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [state, setState] = useState({
    details: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    isComplete: false,
    isSubmitted: false,
    emailError: false,
    passwordError: false,
    firstNameError: false,
    lastNameError: false,
    formSubmitted: false,
    email_exists_error: false,
    campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
  });
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalContext, GlobalContextProvider };
