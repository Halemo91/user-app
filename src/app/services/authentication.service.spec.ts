import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models';
import { AuthenticationService } from './authentication.service';
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  beforeEach(() => {
    const matSnackBarStub = { open: (string, string1, object) => ({}) };
    const routerStub = {
      navigate: array => ({}),
      navigateByUrl: string => ({})
    };
    const userStub = {
      address: { street: {}, houseNumber: {}, zip: {}, city: {} },
      firstName: {},
      lastName: {},
      dateOfBirth: {}
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: MatSnackBar, useValue: matSnackBarStub },
        { provide: Router, useValue: routerStub }
      ]
    });
    service = TestBed.get(AuthenticationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('saveUser', () => {
    it('makes expected calls', () => {
      const matSnackBarStub: MatSnackBar = TestBed.get(MatSnackBar);
      const routerStub: Router = TestBed.get(Router);
      const httpTestingController = TestBed.get(HttpTestingController);
      spyOn(matSnackBarStub, 'open').and.callThrough();
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      expect(matSnackBarStub.open).toHaveBeenCalled();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      const req = httpTestingController.expectOne('../assets/users.json');
      expect(req.request.method).toEqual('GET');
      httpTestingController.verify();
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      service.logout();
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
    });
  });
  describe('getUsers', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const req = httpTestingController.expectOne('../assets/users.json');
      expect(req.request.method).toEqual('GET');
      req.flush();
      httpTestingController.verify();
    });
  });
});
