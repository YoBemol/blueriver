import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/Home";
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Home/>}></Route>
        <Route path ='/Dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
