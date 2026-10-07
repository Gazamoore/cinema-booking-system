import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
//not sure why this is underlined as it matches the file name of Home.jsx, potentially due to me renaming it from home.jsx but I am unsure -> check later as it works for now
import Home from "./pages/Home";

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home /> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
