import { Wrapper } from "../styles/Todo.styles";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../api/todos.api";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import Form from "../components/Form";
import AddButton from "../components/AddButton";

function Todo({ user }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateId, setUpdateId] = useState(null);
  //form hook starts here
  const initialFormData = {
    task: "",
    title: "",
  };
  const initialFormFields = [
    { label: "Title", placeholder: "Add Title", id: "title", value: "" },
    { label: "Task", placeholder: "Add Task", id: "task", value: "" },
  ]; //id should match with fromData fields
  //open form
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formFields, setFormFields] = useState(initialFormFields);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
    setFormFields(initialFormFields);
    setUpdateId(null);
  };
  const handleFormSubmit = () => {
    if (updateId) {
      const newTodo = {
        task: formData.task,
        title: formData.title,
      };
      updateTodo(updateId, newTodo).then(() => {
        setLoading(true);
        getTodos().then((todos) => {
          setTodos(todos);
          setLoading(false);
          setUpdateId(null);
        });
      });
    } else {
      addTodo(user.id, formData.task, formData.title).then(() => {
        setLoading(true);
        getTodos().then((todos) => {
          setTodos(todos);
          setLoading(false);
        });
      });
    }

    handleClose();
  };

  const onChange = (event) => {
    const { value, id } = event.target;
    setFormData({ ...formData, [id]: value });
    const indexOfField = formFields.findIndex((field) => field.id === id);
    const newFields = [...formFields];
    newFields[indexOfField].value = value;
    setFormFields(newFields);
  };

  //form hook ends here
  useEffect(() => {
    if (user) {
      getTodos().then((todos) => {
        setTodos(todos);
        setLoading(false);
      });
    }
  }, [user]);

  //deletes todo
  const handleDelete = (id) => {
    deleteTodo(id).then(() => {
      setLoading(true);
      getTodos().then((todos) => {
        setTodos(todos);
        setLoading(false);
      });
    });
  };

  //update todo
  //WARNING BAD CODE CHANGE LATER
  //USE EITHER FORMDATA OR FORMFIELDS IN TABLE
  const handleUpdate = (id) => {
    const selectedTodo = todos.find((todo) => (todo._id = id));
    setFormData({
      task: selectedTodo.task,
      title: selectedTodo.title,
    });
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
      <AddButton onClick={handleClickOpen} min="20px" max="50px" />
      {todos.length === 0 ? (
        <p>Woo hoo!! You have no tasks todo!</p>
      ) : (
        <div className="grid">{cards}</div>
      )}

      <Form
        open={open}
        handleClose={handleClose}
        data={formData}
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
