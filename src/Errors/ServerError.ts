class ServerError extends Error {
  code = 500;
  constructor(message: string) {
    super("Unauthorized");
    this.message = message;
  }
}

export default ServerError;
