import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ShoppingCartItem } from '../shopping-cart-item';

@Component({
  selector: 'app-order-item-card',
  templateUrl: './order-item-card.component.html',
  styleUrls: ['./order-item-card.component.scss']
})
export class OrderItemCardComponent implements OnInit {

  @Input() item: ShoppingCartItem;

  @Output() deleteEvent = new EventEmitter<ShoppingCartItem>();

  constructor(public translate: TranslateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  reservationTotalPrice(): number {
    return this.item.eventTotalPrice * this.item.reservedTickets;
  }

  deleteCard() {

    this.translate.get('DIALOG.DELETE_ELEMENT').subscribe(title => {
      this.translate.get('DIALOG.ARE_YOU_SURE_DELETE_ELEMENT').subscribe(message => {
        this.translate.get('DIALOG.YES').subscribe(yesText => {
          this.translate.get('DIALOG.NO').subscribe(noText => {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              width: '250px',
              data: {
                title: title,
                content: message,
                yesButtonText: yesText,
                noButtonText: noText,
                confirmValue: undefined
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.deleteEvent.emit(this.item);
              }
            });
          });
        });
      });
    });
  }

}
