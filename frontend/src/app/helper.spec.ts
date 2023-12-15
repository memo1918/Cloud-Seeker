import { ComponentFixture } from "@angular/core/testing";

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
    let timeout: number;
    let resolve = () => {
      if (timeout) clearTimeout(timeout);
      _resolve();
    }

    let interval = setInterval(() => fixture.detectChanges(), 1);

    timeout = setTimeout(() => {
      resolve();
      clearInterval(interval);
    }, 200) as any as number;

    fixture.detectChanges();
  });
}
