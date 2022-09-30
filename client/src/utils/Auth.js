// 쿠키가 있는지 확인하는 페이지
import { useCookies } from 'react-cookie';  
// import { Navigate } from 'react-router-dom';

const Auth = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  return cookies.token !== undefined && cookies.token !== "undefined"
    ? true
    : false;
  // if (Object.keys(cookies).length === 0) {
  //   return (
  //   );
  // }
  // if (cookies.token === "undefined") {
  //   return 
  // }
};

export default Auth;