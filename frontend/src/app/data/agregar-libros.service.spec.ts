import { TestBed } from '@angular/core/testing';

import { AgregarLibrosService } from './agregar-libros.service';

describe('AgregarLibrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgregarLibrosService = TestBed.get(AgregarLibrosService);
    expect(service).toBeTruthy();
  });
});
