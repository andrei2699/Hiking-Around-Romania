import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-change-ticket-number',
	templateUrl: './change-ticket-number.component.html',
	styleUrls: ['./change-ticket-number.component.scss']
})
export class ChangeTicketNumberComponent implements OnInit {

	@Input() ticketNumber: number;
	@Output() ticketNumberChange = new EventEmitter<number>();

	@Input() minNumber: number;
	@Input() maxNumber: number;

	constructor() { }

	ngOnInit(): void {
	}

	onMinusButtonClick() {
		if (this.ticketNumber > this.minNumber) {
			this.ticketNumber--;
			this.ticketNumberChange.emit(this.ticketNumber);
		}
	}

	onPlusButtonClick() {
		if (this.ticketNumber < this.maxNumber) {
			this.ticketNumber++;
			this.ticketNumberChange.emit(this.ticketNumber);
		}
	}
}
