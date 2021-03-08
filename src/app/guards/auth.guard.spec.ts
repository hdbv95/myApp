import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let injector: TestBed;
  let authService: AuthService
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerMock },],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    authService = injector.get(AuthService);
    guard = injector.get(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
