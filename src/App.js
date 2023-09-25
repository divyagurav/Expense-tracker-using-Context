import "./App.css";
import SignUpPage from "./Components/Pages/SignUpPage";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./Components/Pages/WelcomePage";
import ForgotPage from "./Components/ForgotPage";
import Expensepage from "./Components/Pages/ExpensePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUpPage />}></Route>
        <Route path="/welcome" element={<WelcomePage />}></Route>
        <Route path="/forgotPage" element={<ForgotPage></ForgotPage>}></Route>
        <Route path="/expense" element={<Expensepage></Expensepage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
