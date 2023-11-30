export type ResponseMappings = { [endsWith: string]: [BodyInit, ResponseInit] };

export class FetchMockSpec {
  private static instance: FetchMockSpec | undefined;
  private spy: jasmine.Spy<Window[keyof Window] extends jasmine.Func ? Window[keyof Window] : (Window[keyof Window] extends {
    new(...args: infer A): infer V
  } ? ((...args: A) => V) : never)>;

  public static getInstance() {
    if (!FetchMockSpec.instance) {
      FetchMockSpec.instance = new FetchMockSpec();
    }
    return FetchMockSpec.instance;
  }

  private constructor() {
    this.spy = spyOn(window, "fetch");
  }

  public setSpy() {
    this.spy.and.callFake(this.handleRequest.bind(this));
  }

  public removeSpy() {
    this.spy.and.callThrough();
  }

  public dummyData: ResponseMappings = {};

  private nextResponse: Response | null = null;

  private handleRequest(input: RequestInfo | URL, init: RequestInit | undefined) {
    let res = this.nextResponse;
    this.nextResponse = null;
    if (res) {
      return Promise.resolve(res);
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
          return Promise.resolve(new Response(...this.dummyData[dummyDataKey]));
        }
      }
    }

    throw (`Invalid url for testing: ${input}`);

  }


  public setNextRequest(response: Response) {
    this.nextResponse = response;
  }

  public setResponseData(data: ResponseMappings) {
    this.dummyData = data;
  }

  public resetResponseData() {
    this.nextResponse = null;
    this.dummyData = {};
  }
}
