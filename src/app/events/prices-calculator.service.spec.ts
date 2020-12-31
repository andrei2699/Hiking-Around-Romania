import { TestBed } from '@angular/core/testing';

import { PricesCalculatorService } from './prices-calculator.service';

describe('PricesCalculatorService', () => {
  let service: PricesCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricesCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
