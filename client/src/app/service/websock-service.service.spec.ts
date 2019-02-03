import { TestBed, inject } from '@angular/core/testing';

import { WebsockServiceService } from './websock-service.service';

describe('WebsockServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebsockServiceService]
    });
  });

  it('should be created', inject([WebsockServiceService], (service: WebsockServiceService) => {
    expect(service).toBeTruthy();
  }));
});
