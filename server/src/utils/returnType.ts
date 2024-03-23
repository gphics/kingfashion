type response = {
  // @ts-ignore
  data?: object | Array;
  message?: string;
};

export default interface returnType {
  response: null | response;
  err: null | string;
}
