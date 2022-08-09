export {};

declare global {
  type User = {
    _id: string;
    userid: string;
    username: string;
    socketId?: string;
  };

  type MyTodo = {
    _id: string;
    user: string;
    task: string;
    title: string;
  };
}
