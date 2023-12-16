export class PromiseQueue {
  private queue: (() => Promise<any>)[] = [];
  private running: boolean = false;

  enqueue(promiseGenerator: () => Promise<any>) {
    this.queue.push(promiseGenerator);
    if (!this.running) {
      this.runQueue();
    }
  }

  private async runQueue() {
    if (this.running || this.queue.length === 0) {
      return;
    }

    this.running = true;
    const nextPromise = this.queue.shift();
    if (nextPromise) {
      try {
        await nextPromise();
      } catch (error) {
        console.error("Error occurred in promise:", error);
      }
    }
    this.running = false;
    this.runQueue();
  }
}
