import { io } from "socket.io-client";

class WsService {

  private workRequestSocket: any;
  private workPlanSocket: any;

  constructor() {
    const options = {
      transports: ['websocket'],
      upgrade: false
    }
    this.workRequestSocket = io(`${process.env.REACT_APP_API_URI}/work-request`, options);
    this.workPlanSocket = io(`${process.env.REACT_APP_API_URI}/work-plan`, options);
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
