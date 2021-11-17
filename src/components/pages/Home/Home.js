import React, {useState} from 'react';
import ClockSVG from "@src/assets/Countdown Clock.svg";
import WeeklySVG from '@src/assets/Weekend.svg';
import MonthlySVG from '@src/assets/Month View.svg';
import "./home.css";

const AppContext = React.createContext();

const Home = () => {
  const [userCookie, setUserCookie] = useState(null);

  return (
    <AppContext.Provider>
        <main className="home-page">
        <button className="info">
          <WeeklySVG />
          Semanal
        </button>
        <button className="info">
          <MonthlySVG />
          Mensal
        </button>
        <Tarefas />
      </main>
    </AppContext.Provider>
  )
}

const Tarefas = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <section className="tasks-ctn">
      <h5>Data</h5>
      {tasks.map((task) => {
        return <Task content={task} />
      })}
    </section>
  )
}

const Task = () => {
  return (
    <section className="task">
      <h4>Title</h4>
    </section>
  )
}

export default Home;
