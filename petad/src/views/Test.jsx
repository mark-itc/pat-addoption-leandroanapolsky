import { useEffect, useState, useContext } from "react";
import { logContext } from "../components/logContext";
function Test() {
  const { userId } = useContext(logContext);
  return (
    <>
      <div>{userId.userId}</div>
    </>
  );
}

export default Test;
// //Mark Vaykhansky21:42
// logInUser = () => {
// 	const data = await fetch('localhost:3001/logInUser', { username, password });
// 	const { user_id, authentication_token } = data;
	
// 	setUserId(user_id);
// 	setAuthToken(authentication_token);

// 	// Need add this:
// 	localStorage.setItem('cachedUser', JSON.stringify({ user_id, authentication_token }));
// };


// useEffect(() => {
// 	if(localStorage.getItem('cachedUser') !== undefined) { 
// 		const { user_id, authentication_token } =JSON.parse(localStorage.getItem('cachedUser'));
		
// 		setUserI