import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BomberGameComponent } from './bomber-game.component';

describe('BomberGameComponent', () => {
  let component: BomberGameComponent;
  let fixture: ComponentFixture<BomberGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BomberGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BomberGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
