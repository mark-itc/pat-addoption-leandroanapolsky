import { createContext, useEffect, useState, useContext } from "react";

export const logContext = createContext();

export default function LogContextProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [loggedUser, setLoggedUser] = useState({ userId: "", token: "", username:"" });

  const showLogin = () => {
    setModalShow(!modalShow);
  };

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
        // "Authentication" (o authorization?): signedUserToken
      },
      body: JSON.stringify(signInObj),
    })
      .then((response) => response.json())
      .then((data) => {
        
        setLoggedUser((prevState) => ({
          ...prevState,
          token: data.token.toString(),
        }));
        setLoggedUser((prevState) => ({
          ...prevState,
          userId: data.user._id,
        }));
        setLoggedUser((prevState) => ({
          ...prevState,
          username: data.user.username,
        }));
        
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });

    showLogin();
    logUser();
  };

  useEffect(()=>{
    console.log(loggedUser)
  }, [loggedUser])

  useEffect(() => {
  
    const cachedUser = JSON.stringify(loggedUser);
    localStorage.setItem("cachedUser", cachedUser);
  }, [loggedUser]);

    useEffect(()=>{
      const check = localStorage.getItem('cachedUser')
  if(check !== undefined) {  const{loggedUser} = JSON.parse(check) }
    }, [])

  return (
    <logContext.Provider
      value={{
        loggedIn,
        logUser,
        logUserOut,
        checkSignIn,
        modalShow,
        showLogin,
        loggedUser,
      }}
    >
      {children}
    </logContext.Provider>
  );
}
