import { createContext, useContext, useState } from "react";

const userContext = createContext();


function UserProvider({children}){
    const [auth , setAuth] = useState(null);
    return (
        <userContext.Provider value={{
            auth,
            setAuth,
            

        }}>
            {children}
        </userContext.Provider>
    )
}


function UserDetails(){
    return useContext(userContext);
}

export {UserDetails,UserProvider};