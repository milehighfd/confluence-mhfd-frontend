import { io } from "socket.io-client";

class WsService {

  private socket: any;

  constructor() {
    this.socket = io("http://localhost:3003");
  }

  sendUpdate(type: string, data: any) {
    this.socket.emit('update', data);
  }

  receiveUpdate(type: string, callback: Function) {
    this.socket.on('update', callback);
  }

}

export default new WsService();
