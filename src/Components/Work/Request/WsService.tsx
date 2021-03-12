import { io } from "socket.io-client";

class WsService {

  private workRequestSocket: any;
  private workPlanSocket: any;

  constructor() {
    this.workRequestSocket = io("http://localhost:3003/work-request");
    this.workPlanSocket = io("http://localhost:3003/work-plan");
  }

  sendUpdate(type: string, data: any) {
    let socket;
    if (type === 'work-request') {
      socket = this.workRequestSocket;
    } else {
      socket = this.workPlanSocket;
    }
    socket.emit('update', data);
  }

  receiveUpdate(type: string, callback: Function) {
    let socket;
    if (type === 'work-request') {
      socket = this.workRequestSocket;
    } else {
      socket = this.workPlanSocket;
    }
    socket.on('update', callback);
  }

}

export default new WsService();
