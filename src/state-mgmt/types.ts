export interface IAction<T = string, P = any> {
  type: T;
  payload: P;
}
