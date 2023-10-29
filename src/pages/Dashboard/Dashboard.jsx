// import { useState } from "react";
// import SideBar from "../../components/SideBar";
// import Tabs from "../../components/Tabs";
// import Table from "../../components/Table";
// import "./dashboard.css";
// import Search from "../../components/Search";
// import Modal from "../../components/Modal";
import SideBar from '../../components/SideBar';
import InfoProject from './components/InfoProject';




function Dashboard() {

   return (
      <div className='layout'>
         <SideBar/>
       
         <InfoProject />
      </div>


   );
}
export default Dashboard;
