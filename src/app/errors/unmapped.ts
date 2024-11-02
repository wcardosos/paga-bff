export class UnmappedError extends Error {
  constructor(error: Error) {
    super(`Unmapped error: ${error}`);
    this.name = 'UnmappedError';
  }
}
