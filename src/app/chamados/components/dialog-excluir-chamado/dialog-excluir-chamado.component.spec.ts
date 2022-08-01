import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcluirChamadosComponent } from './dialog-excluir-chamado.component';

describe('DialogExcluirChamadoComponent', () => {
  let component: DialogExcluirChamadosComponent;
  let fixture: ComponentFixture<DialogExcluirChamadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExcluirChamadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExcluirChamadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
