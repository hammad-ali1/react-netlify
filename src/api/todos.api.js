import axios from "axios";

const getTodos = async () => {
  try {
    const response = await (await axios.get("/todos")).data;
    return response.todos;
  } catch (err) {
    console.log(err);
  }
};

const addTodo = async (user, task, title) => {
  try {
    const response = await (
      await axios.post("/todos", { user, task, title })
    ).data;
    return response;
  } catch (err) {
    console.log(err);
  }
};

export { getTodos, addTodo };
