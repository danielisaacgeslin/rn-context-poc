import { throttle } from './throttle';

describe('throttle', () => {
  it('should throttle', done => {
    const fn = jasmine.createSpy();
    const throttled = throttle(fn, 60);
    throttled('a'); // 1
    setTimeout(() => throttled('b'), 50);
    setTimeout(() => throttled('c'), 80); // 2
    setTimeout(() => {
      expect(fn.calls.count()).toBe(2);
      done();
    }, 200);
  });
});
