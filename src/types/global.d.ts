export {};

declare global {
  type User = {
    _id: string;
    userid: string;
    username: string;
    socketId?: string;
  };

  type MyError = {
    message: string;
    err: any;
  };
}
