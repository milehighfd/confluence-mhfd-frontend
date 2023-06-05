class EntityError extends Error {
  code = 422;
  constructor(message: string) {
    super("Unauthorized");
    this.message = message;
  }
}

export default EntityError;
