import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';
import PublicRoute from "./Router/PublicRoute";
import PrivateRoute from "./Router/PrivateRoute";  
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import JoinPage from "./pages/JoinPage"
import AuthMainPage from "./pages/AuthMainPage";
import './App.css';

const App = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const auth = cookies.token;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute authenticated={auth} component={<MainPage />} />} />
          <Route path="/login" element={<PublicRoute authenticated={auth} component={<LoginPage />} />}/>
          <Route path="/join" element={<PublicRoute authenticated={auth} component={<JoinPage />} />} />
          <Route path="/memo" element={<PrivateRoute authenticated={auth} component={<AuthMainPage />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
