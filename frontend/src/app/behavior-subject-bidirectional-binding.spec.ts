import {BehaviorSubjectBidirectionalBinding} from './behavior-subject-bidirectional-binding';
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";

describe('BehaviorSubjectBidirectionalBinding', () => {
  it('should sync the objects', () => {
    // Dein ursprüngliches BehaviorSubject mit einem Array von Strings
    const stringsSubject = new BehaviorSubject<string[]>(['1', '2', '3']);
    // Dein zweites BehaviorSubject mit einem Array von Zahlen
    const numbersSubject = new BehaviorSubject<string[]>(["1", "2", "3"]);
    expect(new BehaviorSubjectBidirectionalBinding(stringsSubject, numbersSubject)).toBeTruthy();

    // Jetzt kannst du die beiden BehaviorSubjects wie folgt verwenden:
    stringsSubject.next(["4", "5", "6"]);
    expect(numbersSubject.getValue()).toEqual(["4", "5", "6"]);
  });

  it("should sync the objects bidirectional", () => {
    // Dein ursprüngliches BehaviorSubject mit einem Array von Strings
    const stringsSubject = new BehaviorSubject<string[]>(['1', '2', '3']);
    // Dein zweites BehaviorSubject mit einem Array von Zahlen
    const numbersSubject = new BehaviorSubject<string[]>(["1", "2", "3"]);
    expect(new BehaviorSubjectBidirectionalBinding(stringsSubject, numbersSubject)).toBeTruthy();

    // Jetzt kannst du die beiden BehaviorSubjects wie folgt verwenden:
    stringsSubject.next(["4", "5", "6"]);
    expect(numbersSubject.getValue()).toEqual(["4", "5", "6"]);

    numbersSubject.next(["7", "8", "9"]);
    expect(stringsSubject.getValue()).toEqual(["7", "8", "9"]);
  });

  it("should sync the objects with mappping", () => {
    // Dein ursprüngliches BehaviorSubject mit einem Array von Strings
    const stringsSubject = new BehaviorSubject<string[]>(['1', '2', '3']);
    // Dein zweites BehaviorSubject mit einem Array von Zahlen
    const numbersSubject = new BehaviorSubject<number[]>([1, 2, 3]);
    const behaviorSubjectBidirectionalBinding = new BehaviorSubjectBidirectionalBinding(stringsSubject, numbersSubject);
    expect(behaviorSubjectBidirectionalBinding).toBeTruthy();
    behaviorSubjectBidirectionalBinding.setPipeA(map(value => value.map((v: any) => parseInt(v))));
    behaviorSubjectBidirectionalBinding.setPipeB(map(value => value.map((v: any) => v.toString())));
    // Jetzt kannst du die beiden BehaviorSubjects wie folgt verwenden:
    stringsSubject.next(["4", "5", "6"]);
    expect(numbersSubject.getValue()).toEqual([4, 5, 6]);

    numbersSubject.next([7, 8, 9]);
    expect(stringsSubject.getValue()).toEqual(["7", "8", "9"]);
  });
});
