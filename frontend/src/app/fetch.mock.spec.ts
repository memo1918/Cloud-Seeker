export class FetchMockSpec {
  private instance: FetchMockSpec | undefined;

  getInstance() {
    if (!this.instance) {
      this.instance = new FetchMockSpec();
    }
    return this.instance;
  }

  private constructor() {
    spyOn(window, "fetch").and.callFake((...args) => this.handleRequest(...args));
  }

  public dummyData: { [endsWith: string]: Response } = {};

  private nextResponse: Response | null = null;

  private handleRequest(input: RequestInfo | URL, init: RequestInit | undefined) {
    return new Promise<Response>((resolve, reject) => {
      let res = this.nextResponse;
      this.nextResponse = null;
      if (res) {
        resolve(res);
        return;
      }
      // if(input instanceof URL){
      //
      // }
      // if(input instanceof Request){
      //
      // }
      if (typeof input == "string") {
        for (const dummyDataKey in this.dummyData) {
          if (input.endsWith(dummyDataKey)) {
            resolve(this.dummyData[dummyDataKey]);
            return;
          }
        }
      }
      reject("Invalid input for testing");

    });
  }


  public setNextRequest(response: Response) {

  }
}
