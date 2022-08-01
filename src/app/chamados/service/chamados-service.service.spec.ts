import { TestBed } from '@angular/core/testing';
import { ChamadosServiceService } from './chamados-service.service';


describe('ChamadosServiceService', () => {
  let service: ChamadosServiceService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
