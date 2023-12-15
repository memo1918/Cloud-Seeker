import { ComponentFixture } from "@angular/core/testing";
import { debounce } from "lodash";

export function elementToBePresent(selector: string, fixture: ComponentFixture<any>) {
  return new Promise<Element>(async (resolve, reject) => {
    fixture.detectChanges();

    let element = document.querySelector(selector);
    let observer: MutationObserver;
    let timeout: number;

    if (element) {
      return resolve(element);
    }

    timeout = setTimeout(() => {
      let element = document.querySelector(selector);

      if (observer) observer.disconnect();

      if (element) {
        return resolve(element);
      }
      reject(`element "${selector}" not found`);
    }, 200) as any;

    observer = new MutationObserver(mutations => {
      let element = document.querySelector(selector);

      if (element) {
        observer.disconnect();
        if (timeout) clearTimeout(timeout);
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  });
}

export async function domUpdate(fixture: ComponentFixture<any>) {
  return new Promise<void>(async (_resolve) => {
    fixture.detectChanges();
    let observer: MutationObserver;
    let timeout: number;
    let resolve = debounce(function(...args) {
      _resolve(...args);
      if (timeout) clearTimeout(timeout);
      if (observer) observer.disconnect();
    }, 64, { leading: true, trailing: true });

    timeout = setTimeout(() => {
      resolve();
    }, 200) as any as number;

    observer = new MutationObserver(mutations => {
      observer.disconnect();
      resolve();
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: true
    });

    fixture.detectChanges();
  });
}
