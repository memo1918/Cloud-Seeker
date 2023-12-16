import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-toastmessage',
  templateUrl: './toastmessage.component.html',
  styleUrls: ['./toastmessage.component.scss']
})
export class ToastmessageComponent implements OnInit{
  private oldLen: number = 0;
  constructor( public shoppingCart: ShoppingCartService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.oldLen = this.shoppingCart.getItems().length;
    this.shoppingCart.getItemsObserver().subscribe((items) => ( this.openSnackBar(items.length)));
  }


  openSnackBar(itemLen:number) {
    if (this.oldLen < itemLen){
      this.snackBar.open("Instance added", "Close",{
        duration: 2000
      });
    }

    if (this.oldLen > itemLen){
      this.snackBar.open("Instance removed", "Close",{
        duration: 2000
      });
    }

    this.oldLen = itemLen;
    return;
  }



}
