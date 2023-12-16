export type ResponseMappings = { [endsWith: string]: [BodyInit, ResponseInit] };

export class FetchMockSpec {
  private static instance: FetchMockSpec | undefined;
  private spy: jasmine.Spy<Window[keyof Window] extends jasmine.Func ? Window[keyof Window] : (Window[keyof Window] extends {
    new(...args: infer A): infer V
  } ? ((...args: A) => V) : never)> | null = null;

  public static getInstance() {
    if (!FetchMockSpec.instance) {
      FetchMockSpec.instance = new FetchMockSpec();
    }
    return FetchMockSpec.instance;
  }

  private constructor() {
  }

  public setSpy() {
    // if(this.spy) return this;
    this.spy = spyOn(window, "fetch");
    this.spy.and.callFake(this.handleRequest.bind(this));
    return this;
  }

  public dummyData: ResponseMappings = {};

  private nextResponse: Response | null = null;

  private handleRequest(input: RequestInfo | URL, init: RequestInit | undefined) {
    console.log("mocking request for", input);
    let res = this.nextResponse;
    this.nextResponse = null;
    if (res) {
      return Promise.resolve(res);
    }
    if (typeof input == "string") {
      for (const dummyDataKey in this.dummyData) {
        if (input.endsWith(dummyDataKey)) {
          return Promise.resolve(new Response(...this.dummyData[dummyDataKey]));
        }
      }
    }

    throw (`Invalid url for testing: ${input}`);
  }


  public setNextRequest(response: Response) {
    this.nextResponse = response;
    return this;
  }

  public setResponseData(data: ResponseMappings) {
    this.dummyData = data;
    return this;
  }

  public resetResponseData() {
    this.nextResponse = null;
    this.dummyData = {};
    return this;
  }

  getSpy() {
    return this.spy!;
  }

  // private clearSpy() {
  //   this.spy!.and.callThrough();
  //   this.spy = null;
  // }
}
