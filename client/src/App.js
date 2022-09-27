import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import MainPage from "./pages/MainPage"
import LoginPage from "./pages/LoginPage"
import JoinPage from "./pages/JoinPage"
import AuthMainPage from "./pages/AuthMainPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/memo" element={<AuthMainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
