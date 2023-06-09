import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homecomponent from "./pages/home-component";
import Logincomponent from "./pages/login-component";
import Registercomponent from "./pages/register-component";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homecomponent />} />
            <Route path="login" element={<Logincomponent />} />
            <Route path="register" element={<Registercomponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
