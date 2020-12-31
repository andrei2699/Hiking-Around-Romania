import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddToCartDialogData } from './add-to-cart-dialog-data';

@Component({
  selector: 'app-add-to-shopping-cart-dialog',
  templateUrl: './add-to-shopping-cart-dialog.component.html',
  styleUrls: ['./add-to-shopping-cart-dialog.component.scss']
})
export class AddToShoppingCartDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddToShoppingCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddToCartDialogData) { }

  ngOnInit(): void {
    this.data.numberOfTickets = 1;
  }

  noButtonClick() {
    this.data.numberOfTickets = 0;
    this.dialogRef.close();
  }

}
