export {};

declare global {
  type User = {
    _id: string;
    userid: string;
    username: string;
  };

  type MyError = {
    message: string;
    err: any;
  };
}
