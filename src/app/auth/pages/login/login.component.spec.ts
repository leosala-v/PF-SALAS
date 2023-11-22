import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideMockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [provideMockStore({})],
    });
    const fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
  });

  it('should create login component', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('should mark all form fields as "touched" if the form is invalid', () => {
    loginComponent.loginForm.patchValue({
      email: 'asndfgndskgnjdsk43534',
      password: '',
    });
    loginComponent.login();
    expect(loginComponent.emailControl.touched).toBeTrue();
    expect(loginComponent.passwordControl.touched).toBeTrue();
  });

  it('should call the login method of AuthService if the form is valid', () => {
    const fakeAuthService = {
      login: jasmine.createSpy('login')
    };
    (loginComponent as any).authService = fakeAuthService;

    loginComponent.loginForm.patchValue({
      email: 'fakeemail@mail.com',
      password: '123456',
    });

    loginComponent.login();
    
    expect(fakeAuthService.login).toHaveBeenCalled();
  });
});
