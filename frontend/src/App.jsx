import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
//not sure why this is underlined as it matches the file name of Home.jsx, potentially due to me renaming it from home.jsx but I am unsure -> check later as it works for now
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Bookings from "./pages/Bookings";

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home /> } />
          <Route path="/Movies" element={<Movies />}/>
          <Route path="/bookings" element={<Bookings />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
