export const getDeps = <State>() => ({
  apiService: { request: fetch },
  stateSnapshot: (() => {
    let state: State;
    return {
      set: (s: State) => {
        state = s;
      },
      get: () => state
    };
  })()
});
