import { io } from "socket.io-client";

const WS_URL = process.env.REACT_APP_WS_URL;

class WsService {

  private workRequestSocket: any;
  private workPlanSocket: any;

  constructor() {
    const options = {
      transports: ['websocket', 'polling'],
      upgrade: true,
      autoConnect: false
    }
    this.workRequestSocket = io(`${WS_URL}/work-request`, options);
    this.workPlanSocket = io(`${WS_URL}/work-plan`, options);
    this.workRequestSocket.on('connect', () => {
      console.log('workRequestSocket connected');
    });
    this.workPlanSocket.on('connect', () => {
      console.log('workPlanSocket connected');
    });
    this.workRequestSocket.on("disconnect", (reason: any) => {
      console.log('reason', reason);
      if (reason === "io server disconnect") {
        this.workRequestSocket.connect();
      }
    });
    this.workPlanSocket.on("disconnect", (reason: any) => {
      console.log('reason', reason);
      if (reason === "io server disconnect") {
        this.workPlanSocket.connect();
      }
    });

    this.workRequestSocket.on("disconnect", (reason: any) => {
      console.log('reason', reason);
      if (reason === "io server disconnect") {
        this.workRequestSocket.connect();
      }
    });

    this.workRequestSocket.on('connect_error', () => {
      console.log('Client workRequestSocket connect_error');
    });

    this.workPlanSocket.on('connect_error', () => {
      console.log('Client workPlanSocket connect_error');
    });

    this.workRequestSocket.onAny((event: any, ...args: any) => {
      console.log('workRequestSocket onAny', event, args);
    });

  }

  connect(type: string, cb: Function) {
    console.log('Connecting to WS:' + type)
    let socket: any;
    if (type === 'work-request') {
      socket = this.workRequestSocket;
    } else {
      socket = this.workPlanSocket;
    }
    socket.on('connect', () => {
      cb(socket)
    })
    socket.connect();
  }

  sendUpdate(type: string, data: any) {
    let socket;
    if (type === 'work-request') {
      socket = this.workRequestSocket;
    } else {
      socket = this.workPlanSocket;
    }
    console.log('disconnected', socket.disconnected)
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

  disconnect(type: string) {
    console.log('Disconnecting to WS:' + type)
    let socket;
    if (type === 'work-request') {
      socket = this.workRequestSocket;
    } else {
      socket = this.workPlanSocket;
    }
    socket.disconnect();
  }

}

export default new WsService();
