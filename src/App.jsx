import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],

    [
      {
        id: 1,
        title: "Estudar programação",
        description: "Estudar para a prova e o desafio",
        completed: false,
      },

      {
        id: 2,
        title: "Fazer exercícios",
        description: "Fazer exercicios de tarde",
        completed: false,
      },

      {
        id: 3,
        title: "Compras",
        description: "123",
        completed: false,
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    async function fetchTasks() {
      //chama api
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      //pega os dados que ela armezena
      const data = await response.json();

      //armazenar(persistir) esses dados no state
      setTasks(data);
    }
    // fetchTasks();
    //se quiser obter as tasks da api, descomenta essa linha acima
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //preciso atualizar a tarefa
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }

      //não preciso atualizar essa tarefa
      return task;
    });
    //atualizando estado
    setTasks(newTasks);
  }

  function onDeleteTask(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTasks = {
      id: v4(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTasks]);
  }

  return (
    <div className='w-screen h-screen bg-slate-500 flex justify-center p-6 '>
      <div className='w-[500px] space-y-4'>
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
