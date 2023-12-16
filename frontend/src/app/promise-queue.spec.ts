import { PromiseQueue } from "./promise-queue";

describe("PromiseQueue", () => {
  it("should create an instance", () => {
    expect(new PromiseQueue()).toBeTruthy();
  });
});
