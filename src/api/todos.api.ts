import { customAxios as axios } from "./auth.api";

const getTodos = async (): Promise<MyTodo[]> => {
  try {
    const response = await (await axios.get("/todos")).data;
    return response.todos;
  } catch (err) {
    console.log(err);
    throw new Error("Error occured in getting todos");
  }
};

const addTodo = async (user: string, task: string, title: string) => {
  try {
    const response = await (
      await axios.post("/todos", { user, task, title })
    ).data;
    return response;
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (id: string) => {
  try {
    const response = await (await axios.post(`/todos/${id}`)).data;
    return response;
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (id: string, newTodo: MyTodo) => {
  try {
    const response = await (await axios.put(`/todos/${id}`, newTodo)).data;
    return response;
  } catch (err) {
    console.log(err);
  }
};
export { getTodos, addTodo, deleteTodo, updateTodo };
