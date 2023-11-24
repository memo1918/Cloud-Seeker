import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  toggle: BehaviorSubject<boolean> = new BehaviorSubject(false);
  toggle$ = this.toggle.asObservable();
}

