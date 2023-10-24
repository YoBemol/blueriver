import { useState } from "react";
import SideBar from "../../components/SideBar";
import Tabs from "../../components/Tabs";
import Table from "../../components/Table";
import "./dashboard.css";
import SearchBar from "../../components/SearchBar";

const Phases = [
  {
    name: "Initiation",
    active: false,
  },
  {
    name: "Planning",
    active: false,
  },
  {
    name: "Execution",
    active: false,
  },
  {
    name: "Monitoring",
    active: false,
  },
  {
    name: "Closure",
    active: false,
  },
];

const tableData = [
  {
    title: "Milestones",
    items: [
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
    ],
  },
  {
    title: "Milestones",
    items: [
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
    ],
  },
  {
    title: "Milestones",
    items: [
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
    ],
  },
  {
    title: "Milestones",
    items: [
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
    ],
  },
  {
    title: "Milestones",
    items: [
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
      },
    ],
  },
];

function Dashboard() {
  const [activePhase, setActivePhase] = useState(0);
  const handlePhaseClick = (id) => {
    setActivePhase(id);
  };

  return (
    <div className="layout">
      <div className="leftSection">
        <div className="dashboardContainer">
          <SideBar />
        </div>
      </div>
      <div className="rigthSection">
        <section>
          <SearchBar/>
        </section>
        <section>
          
        </section>
        <section className="phasesContainer">
          {Phases.map((phase, index) => {
            return (
              <Tabs
                key={index}
                name={phase.name}
                active={index === activePhase}
                handleClick={() => handlePhaseClick(index)}
              />
            );
          })}
        </section>
        <section style={{ width: "50%" }}>
          <Table
            headers={["Description", "Planned Date", "Current Date"]}
            data={tableData[activePhase]}
          ></Table>
        </section>
      </div>
    </div>
  );
}
export default Dashboard;
