import Card from "../components/Card";
import { Wrapper } from "../styles/Todo.styles";
import { getTodos, addTodo } from "../api/todos.api";
import { useEffect, useState } from "react";

function Todo({ user }) {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    if (user) {
      getTodos().then((todos) => setTodos(todos));
    }
  }, [user]);
  const cards = todos.map((todo, index) => {
    return (
      <Card
        key={todo.id}
        heading={`Task number ${index + 1}`}
        mainTitle="Title"
        description={todo.task}
      />
    );
  });

  const addTask = (event) => {
    const task = document.getElementById("task");
    console.log(task.value);
    addTodo(user.id, task.value).then(() => {
      getTodos().then((todos) => setTodos(todos));
    });
  };
  if (!user) {
    return (
      <Wrapper>
        <p>
          Please create an account or log in with one to use this functionality
        </p>
      </Wrapper>
    );
  }
  if (todos.length === 0) {
    return (
      <Wrapper>
        <input type="text" id="task" />
        <button onClick={addTask}>Add a Task</button>
        <p>Woo hoo!! You have no tasks todo!</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <input type="text" id="task" />
      <button onClick={addTask}>Add a Task</button>
      <div className="grid">{cards}</div>
    </Wrapper>
  );
}

export default Todo;
