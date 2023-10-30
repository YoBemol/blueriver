import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Home from "./pages/home/Home";
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Home/>}></Route>
        <Route path ='/Dashboard/:id' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
