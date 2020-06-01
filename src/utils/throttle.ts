export const throttle = (fn: (...args: any[]) => any, delay: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
};
