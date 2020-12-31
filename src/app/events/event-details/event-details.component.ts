import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EventDetails } from '../event-details';
import { EventService } from '../event.service';
import { UNAVAILABLE_IMG_URL } from '../../unavailable_img_url'
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddToShoppingCartDialogComponent } from './add-to-shopping-cart-dialog/add-to-shopping-cart-dialog.component';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { PricesCalculatorService } from '../prices-calculator.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  numberOfTickets: number;

  eventDetails: EventDetails;
  unavailablePhotoUrl = UNAVAILABLE_IMG_URL;
  showAddToCartButton = true;
  isCurrentUser = false;

  constructor(
    public translate: TranslateService,
    public dialog: MatDialog,
    public eventService: EventService,
    public pricesCalculatorService: PricesCalculatorService,
    private _authService: AuthenticationService,
    private _shoppingCartService: ShoppingCartService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');

      this._authService.isCurrentUserRegularUser().subscribe(isRegular => {
        this.showAddToCartButton = isRegular;
      }, err => {
        console.log(err);
      });

      this.eventService.getEvent(eventId)
        .subscribe(eventDetails => {
          this.eventDetails = eventDetails;
          var userId = this.eventDetails.organizerId;
          this._authService.checkIfIdBelongsToLoggedUser(userId)
            .subscribe(r => {
              this.isCurrentUser = r;
            });
        }, err => {
          console.log(err);
        });
    });
  }

  updateEvent() {
    this._router.navigate(['update-event', this.eventDetails.eventId])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddToShoppingCartDialogComponent, {
      width: '300px',
      data: { numberOfTickets: this.numberOfTickets }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this._shoppingCartService.addItemToShoppingCart(this.eventDetails, result);
      }
      this.numberOfTickets = result;
    });
  }
}

