import { TestBed } from '@angular/core/testing';

import { MyExportService } from './my-export.service';

describe('MyExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyExportService = TestBed.get(MyExportService);
    expect(service).toBeTruthy();
  });
});
