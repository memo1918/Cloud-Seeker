import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private baseLocation: string;

  constructor() {
    this.baseLocation = `${window.location.protocol}//${window.location.host}/api`;
  }

  public counter: number | null = null;
  public counterLoading: boolean = true;

  public async loadCounter() {
    try {
      let response = await fetch(`${this.baseLocation}/`);
      let {data}: { "data": { "visitors": number } } = await response.json();
      this.counter = data.visitors;
      this.counterLoading = false;
    } catch (err) {
      console.error(err);
    }
  }
}
