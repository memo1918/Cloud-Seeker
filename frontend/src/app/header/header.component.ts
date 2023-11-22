import {Component} from '@angular/core';
import { HeaderService } from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title: string = 'Cloud-Comparison-Tool';
  protected readonly Component = Component;
  protected readonly onclick = onclick;
  constructor(private service: HeaderService) { }

  openPanel= false;

  public open(){
    this.openPanel = !this.openPanel;
    this.service.toggle.next(this.openPanel)
  }
}

