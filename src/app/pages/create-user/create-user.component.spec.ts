import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { FormBuilder } from '@angular/forms';
import { CreateUserComponent } from './create-user.component';
describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  beforeEach(() => {
    const authenticationServiceStub = { saveUser: value => ({}) };
    const formBuilderStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreateUserComponent],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: FormBuilder, useValue: formBuilderStub }
      ]
    });
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'saveUser').and.callThrough();
      component.onSubmit();
      expect(authenticationServiceStub.saveUser).toHaveBeenCalled();
    });
  });
});
