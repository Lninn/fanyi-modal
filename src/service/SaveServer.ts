export interface IServer {
  getList: () => any[];
  add: () => void;
  remove: () => void;
}

export class Server implements IServer {
  getList() {
    return [];
  }

  add() {
    return;
  }

  remove() {
    return;
  }
}

export default {};
