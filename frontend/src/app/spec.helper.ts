import { ComponentFixture } from "@angular/core/testing";
import { debounce } from "lodash";

export function elementToBePresent(selector: string, fixture: ComponentFixture<any>) {
  return new Promise<Element>(async (resolve, reject) => {
    fixture.detectChanges();
    let element = document.querySelector(selector);
    if (element) {
      return resolve(element);
    }
    let timeout = setTimeout(() => {
      let element = document.querySelector(selector);
      if (element) {
        return resolve(element);
      }
      reject(`element "${selector}" not found`);
    }, 200);
    const observer = new MutationObserver(mutations => {
      let element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        clearTimeout(timeout);
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });


  });
}

export async function domUpdate(fixture: ComponentFixture<any>) {
  return new Promise<void>(async (_resolve) => {
    fixture.detectChanges();
    let resolve = debounce(function(...args) {
      _resolve(...args);
    }, 32);

    let timeout = setTimeout(() => {
      resolve();
    }, 200);

    const observer = new MutationObserver(mutations => {
      resolve();
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });

    fixture.detectChanges();
  });
}
