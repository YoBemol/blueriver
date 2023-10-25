import { useState } from "react";
import SideBar from "../../components/SideBar";
import Tabs from "../../components/Tabs";
import Table from "../../components/Table";
import "./dashboard.css";
import Search from "../../components/Search";
import Modal from "../../components/Modal";

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
        id:1
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:2
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:3
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:4
      },
      {
        description: "description initiation",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:5
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
        id:1
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:2
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:3
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:4
      },
      {
        description: "description planning",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:5
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
        id:1
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:2
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:3
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:4
      },
      {
        description: "description execution",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:5
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
        id:1
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:2
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:3
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:4
      },
      {
        description: "description monitoring",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:5
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
        id:1
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:2
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:3
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:4
      },
      {
        description: "description closure",
        plannedDate: "01/01/2020",
        currentDate: "01/01/2020",
        id:5
      },
    ],
  },
];

function Dashboard() {
  const [activePhase, setActivePhase] = useState(0);
  const handlePhaseClick = (id) => {
    setActivePhase(id);
  };
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [data, setData] = useState(tableData)
  const [modalItem, setModalItem] = useState(null)
  const handleModal = (item) => {
    setModalItem(item)
    cambiarEstadoModal1(true)

  }

  const handleUpdate = (description) => {
    const tempData = [...data]
    tempData[activePhase].items.map((single) => {
      if (single.id === modalItem.id) {
        single.description=description
      }
      return single
    })
    setData(tempData)
    cambiarEstadoModal1(false)
  }

  return (
    <div>
      {estadoModal1 &&
      <Modal estado={estadoModal1} cambiarEstado={() => cambiarEstadoModal1(false)} item={modalItem} updateData={(description) => handleUpdate(description)}></Modal>
      }
      <div className="layout">
        <div className="leftSection">
          <div className="dashboardContainer">
            <SideBar />
          </div>
        </div>
        <div className="rightSection">
          <section className="searchSection">
            <Search />
          </section>
          <section className="informationCharged"></section>
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
          <section className="tablesContainer" /*style={{ width: "50%" }}*/>
            <section className="leftTable">
              <Table
                headers={["Description", "Planned Date", "Current Date"]}
                data={data[activePhase]}
                handleClick={(item) => handleModal(item)}
              ></Table>
            </section>
            <section className="rightTable">

            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
