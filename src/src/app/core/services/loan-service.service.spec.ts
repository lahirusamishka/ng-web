import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoanServiceService } from './loan-service.service';

describe('LoanServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports:[HttpClientTestingModule]}));

  it('should be created', () => {
    const service: LoanServiceService = TestBed.get(LoanServiceService);
    expect(service).toBeTruthy();
  });
});
