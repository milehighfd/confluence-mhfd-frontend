import { io } from "socket.io-client";

const WS_URL = process.env.REACT_APP_WS_URL;

class WsService {

  private socket: any;
  private options: any;

  constructor() {
    this.options = {
      transports: ['polling'],
      upgrade: true,
      autoConnect: false
    }
  }

  connect(type: string, cb: Function) {
    this.socket = io(`${WS_URL}/${type}`, this.options)
    this.socket.on('connect', () => {
      console.log(`Connected to ${type} WS.`);
    })
    this.socket.on('disconnect', (reason: any) => {
      console.log(`Disconnected to ${type} WS. Reason: ${reason}`);
    })
    this.socket.connect();
  }

  sendUpdate(data: any) {
    this.socket.emit('move', data);
  }
  sendEdit() {
    this.socket.emit('finishedit');
  }
  receiveUpdate(callback: Function) {
      this.socket.on('move', callback)
  }

  sendReqmanager(data: any) {
    this.socket.emit('reqmanager', data);
  }

  receiveReqmanager(callback: Function) {
    this.socket.on('reqmanager', callback);
  }

  move(data: any) {
    this.socket.emit('move', data);
  }

  disconnect() {
    this.socket.disconnect();
  }

}

export default new WsService();
