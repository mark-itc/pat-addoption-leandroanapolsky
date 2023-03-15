import { createContext, useEffect, useState, useContext } from "react";

export const logContext = createContext();

export default function LogContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState();
  const [signedUserToken, setSignedUserToken] = useState({ userToken: "" });
  
  const logUser = () => {
    setLoggedIn(!loggedIn);
  };

  const logUserOut = () => {
    console.log("user logged out");
    setLoggedIn(false);
  };

  const checkSignIn = (signInObj) => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos enviados:", data);
        setSignedUserToken((prevState) => ({
          ...prevState,
          userToken: data.token,
        }));
        // console.log('usuario token', signedUserToken)
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });

    // showLogin();
    // logUser();
  };

  useEffect(() => {
    console.log("usuario token", signedUserToken);
    const userToken = JSON.stringify(signedUserToken);
    localStorage.setItem("signedUserToken", userToken);
  }, [signedUserToken]);

  return (
    <logContext.Provider value={{ loggedIn, logUser, logUserOut, checkSignIn }}>
      {children}
    </logContext.Provider>
  );
}
