import { createContext, useState, useContext } from "react";
import FallbackSpinner from "components/spinner";


const SpinnerContext = createContext()

export const SpinnerProvider = ({children}) => {
    const [showSpinner,setShowSpinner] = useState(false)

    const show = () => setShowSpinner(true)
    const hide = () => setShowSpinner(false)

    return(
        <SpinnerContext.Provider value={{ show, hide}} >
           {children}
           <FallbackSpinner show={showSpinner} />
        </SpinnerContext.Provider>
    )
}

export const useSpinner = () => useContext(SpinnerContext)