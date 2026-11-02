import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Demo authentication', () => {
  let component: Auth;
  beforeEach(() => {
    localStorage.clear();
    component = TestBed.createComponent(Auth).componentInstance;
  });
  afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); });

  it('registers fictional details and permits a matching login', () => {
    const success = vi.fn();
    component.authSuccess.subscribe(success);
    component.name = 'Demo'; component.email = 'demo@example.com'; component.password = 'fictional';
    component.register();
    expect(success).toHaveBeenCalledTimes(1);
    component.loginEmail = 'demo@example.com'; component.loginPassword = 'fictional';
    component.login();
    expect(success).toHaveBeenCalledTimes(2);
    component.loginPassword = 'wrong'; component.login();
    expect(success).toHaveBeenCalledTimes(2);
    expect(component.loginMessage).toBe('Incorrect password.');
  });

  it('rejects blank registration fields', () => {
    component.name = ' '; component.email = 'demo@example.com'; component.password = 'fictional';
    component.register();
    expect(localStorage.getItem('olimpoUser')).toBeNull();
  });

  it('handles malformed or unexpected saved data without throwing', () => {
    for (const value of ['{invalid', 'null', '42', '{}', '{"email":7,"password":false}']) {
      localStorage.setItem('olimpoUser', value);
      expect(() => component.login()).not.toThrow();
      expect(component.loginMessage).toContain('Please register again');
    }
  });

  it('handles unavailable browser storage', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    component.name = 'Demo'; component.email = 'demo@example.com'; component.password = 'fictional';
    expect(() => component.register()).not.toThrow();
    expect(component.registerMessage).toContain('storage is unavailable');
  });
});
