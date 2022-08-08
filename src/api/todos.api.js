import { customAxios as axios } from "./auth.api";

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

const deleteTodo = async (id) => {
  try {
    const response = await (await axios.post(`/todos/${id}`)).data;
    return response;
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (id, newTodo) => {
  try {
    const response = await (await axios.put(`/todos/${id}`, newTodo)).data;
    return response;
  } catch (err) {
    console.log(err);
  }
};
export { getTodos, addTodo, deleteTodo, updateTodo };
