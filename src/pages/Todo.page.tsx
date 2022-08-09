import React, { useContext, useEffect, useState } from "react";
//Styles
import { Wrapper } from "../styles/Todo.styles";
//Api
import { getTodos, addTodo, deleteTodo, updateTodo } from "../api/todos.api";
//Components
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import Form from "../components/Form";
import AddButton from "../components/AddButton";
//Context
import { UserContext } from "../context";

function Todo() {
  //Context hooks
  const [user] = useContext(UserContext);
  //States
  const [todos, setTodos] = useState<MyTodo[]>([] as MyTodo[]);
  const [loading, setLoading] = useState(true);
  const [updateId, setUpdateId] = useState("");

  //START FROM RELATED DATA
  const initialFormFields = [
    { label: "Title", placeholder: "Add Title", id: "title", value: "" },
    { label: "Task", placeholder: "Add Task", id: "task", value: "" },
  ]; //id should match with fromData fields
  //open form
  const [open, setOpen] = useState(false);
  const [formFields, setFormFields] = useState(initialFormFields);
  //END FORM RELATED DATA
  //Handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormFields(initialFormFields);
    setUpdateId("");
  };
  const handleFormSubmit = () => {
    if (!user) {
      throw new Error("User not found");
    }
    if (updateId) {
      const newTodo = { task: formFields[0].value, title: formFields[1].value };
      updateTodo(updateId, newTodo).then(() => {
        setLoading(true);
        getTodos().then((todos) => {
          setTodos(todos);
          setLoading(false);
          setUpdateId("");
        });
      });
    } else {
      addTodo(user._id, formFields[0].value, formFields[1].value).then(() => {
        setLoading(true);
        getTodos().then((todos) => {
          setTodos(todos);
          setLoading(false);
        });
      });
    }

    handleClose();
  };

  const onChange = (event: any) => {
    const { value, id } = event.target;
    const indexOfField = formFields.findIndex((field) => field.id === id);
    const newFields = [...formFields];
    newFields[indexOfField].value = value;
    setFormFields(newFields);
  };

  //Effects
  //form hook ends here
  useEffect(() => {
    if (user) {
      getTodos().then((todos) => {
        if (todos) setTodos(todos);
        setLoading(false);
      });
    }
  }, [user]);

  //deletes todo
  const handleDelete = (id: string) => {
    deleteTodo(id).then(() => {
      setLoading(true);
      getTodos().then((todos) => {
        setTodos(todos);
        setLoading(false);
      });
    });
  };

  //update todo

  const handleUpdate = (id: string) => {
    const selectedTodo = todos.find((todo) => (todo._id = id));
    if (!selectedTodo) {
      throw new Error("Invalid Todo id");
    }

    const newFields = [
      {
        label: "Title",
        placeholder: "Add Title",
        id: "title",
        value: selectedTodo.title,
      },
      {
        label: "Task",
        placeholder: "Add Task",
        id: "task",
        value: selectedTodo.task,
      },
    ];
    setFormFields(newFields);
    handleClickOpen();
    setUpdateId(id);
  };
  const cards = todos.map((todo, index) => {
    return (
      <Card
        key={todo._id}
        heading={`Task number ${index + 1}`}
        mainTitle={todo.title}
        description={todo.task}
        handleDelete={() => handleDelete(todo._id)}
        handleUpdate={() => handleUpdate(todo._id)}
        subTitle=""
      />
    );
  });

  if (!user) {
    return (
      <Wrapper>
        <p>
          Please create an account or log in with one to use this functionality
        </p>
      </Wrapper>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <h1>{user.username}</h1>
      <AddButton onClick={handleClickOpen} min="20px" max="50px" />
      {todos.length === 0 ? (
        <p>Woo hoo!! You have no tasks todo!</p>
      ) : (
        <div className="grid">{cards}</div>
      )}

      <Form
        open={open}
        handleClose={handleClose}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
        formFields={formFields}
        title={"Add New Task"}
        buttonText={updateId ? "Update" : "Add"}
      ></Form>
    </Wrapper>
  );
}

export default Todo;
