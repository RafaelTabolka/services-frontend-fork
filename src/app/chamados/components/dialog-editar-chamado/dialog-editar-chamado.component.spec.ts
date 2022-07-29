import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarChamadosComponent } from './dialog-editar-chamado.component';

describe('DialogEditarCargoComponent', () => {
  let component: DialogEditarChamadosComponent;
  let fixture: ComponentFixture<DialogEditarChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditarChamadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditarChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
