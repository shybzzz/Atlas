import { TestBed } from '@angular/core/testing';

import { AtlasApiService } from './atlas-api.service';

describe('AtlasApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtlasApiService = TestBed.get(AtlasApiService);
    expect(service).toBeTruthy();
  });
});
