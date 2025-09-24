import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import MovieId from "./components/MovieId";

function App() {
  return (
    <div>
    <div className="relative z-20 text-white">
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movie/:id" element={<MovieId/>} />
     </Routes>
    </BrowserRouter>
    </div> 
    </div>   
  )
}

export default App
