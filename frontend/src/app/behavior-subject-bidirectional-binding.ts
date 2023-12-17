import {BehaviorSubject, Observable, OperatorFunction, Subscription} from "rxjs";

export class BehaviorSubjectBidirectionalBinding<T extends BehaviorSubject<any>, J extends BehaviorSubject<any>> {
  isUpdating = false;
  public propageateA: boolean = true;
  public propageateB: boolean = true;
  private aSubscription: Subscription;
  private bSubscription: Subscription;
  constructor(private a: T, private b: J) {
    this.aSubscription = a.subscribe(value => this.aChanged(value));
    this.bSubscription = b.subscribe(value => this.bChanged(value));
  }

  setPipeA(pipe: OperatorFunction<any, any>) {
    // remove old subscription
    this.aSubscription.unsubscribe();
    this.aSubscription = this.a.pipe(pipe).subscribe(value => this.aChanged(value));
  }

  setPipeB(pipe: OperatorFunction<any, any>) {
    // remove old subscription
    this.bSubscription.unsubscribe();
    this.bSubscription = this.b.pipe(pipe).subscribe(value => this.bChanged(value));
  }

  private aChanged(value: any) {
    if (this.isUpdating || !this.propageateA) return;

    console.log("a changed");

    this.isUpdating = true;
    this.b.next(value);
    this.isUpdating = false;
  }

  private bChanged(value: any) {
    if (this.isUpdating || !this.propageateA) return;
    console.log("b changed");
    this.isUpdating = true;
    this.a.next(value);
    this.isUpdating = false;
  }

}
