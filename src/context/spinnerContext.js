import { createContext, useState, useContext } from "react";
import FallbackSpinner from "components/spinner";

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  const showSpinnerFn = () => setShowSpinner(true);   
  const hideSpinnerFn = () => setShowSpinner(false);  

  return (
    <SpinnerContext.Provider value={{ showSpinnerFn, hideSpinnerFn }}>
      {children}
      <FallbackSpinner show={showSpinner} />
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => useContext(SpinnerContext);
