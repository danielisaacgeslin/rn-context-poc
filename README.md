#### This project uses:

- [React Native with Typescript](https://reactnative.dev/docs/typescript)
- [React Navigation](https://reactnavigation.org/)
- [Emotion](https://emotion.sh/docs/@emotion/native) for styling

## Commands

- **yarn install** `installs dependencies. It should be used in favor of npm to use the lock file`
- **yarn android** `starts application on android`
- **yarn ios** `starts application on ios`
- **yarn start** `starts the bundler which server the react native application (js code)`
- **yarn test** `run tests`
- **yarn react-native** `access to the locally installed react native cli`

<br/>
<br/>

## State Management

> This project uses **react context** and **react hooks** to handle state management in a fashion similar to a **redux/middleware** combination.
> <br/><br/>
> State management itself is achieved by using a **root level global context provider**, exactly as we would do by using _redux_. The **state object** and **dispatch function**s are exposed by the **globa context** and consumed wherever needed. It's recommended that component's consuming the context directly are few and as top level as possible encourage the use of presentation components which are a lot simpler to test and maintain.
> <br/>**Side effects** _(for instance fetching data from the server and storing it on the global context)_ are handled by **custom hooks**. These hooks will have access to a **deps** _(dependencies)_ object which will serve as an abstraction for all external services uses _(from the custom hook itself)_. This will allow us to have access to all necessary data/functionality needed for our hooks, as well as an easy strategy for testing _(in which **deps** will be replaced by a mocked version)_.

#### Global provider setup

```typescript
export const GlobalProvider = (...) => {
  const [state, dispatch] = useReducer(
    combineReducers<IGlobalState>({ artist: artistReducer }), // global state/reducer map
    initState // initial global state
  );
  useEffect(() => deps.stateSnapshot.set(state), [state]); // dependency meant to access the "current" state without depending on react's life cycle. This is meant to be used in cases where a custom hook altered the state by dispatching an action, either by itself or by invoking another custom hook, and needs access to the latest state version
  return <GlobalContext.Provider value={{ state, dispatch, deps }}>{children}</GlobalContext.Provider>; // exposing the state, dispatch and dependencies object
});
```

#### Global provider instance

```typescript
export const AppRoot = () => {
  return (
    <GlobalProvider deps={getDeps()}>
      <>/** ...application */</>
    </GlobalProvider>
  );
};
```

#### Custom hook with state management side effect

```typescript
export const useArtistEffect = () => {
  const { dispatch, deps } = useContext(GlobalContext); // accessing dispatch and dependencies used by all these callbacks
  const searchArtist = useCallback(
    async (search: string) => {
      // deps.stateSnapshot.get().artist.artistMap // to get a snapshot of the current state
      const { artists } = await (await deps.apiService.request(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${search}`)).json();
      const [artist] = (artists || []) as IArtist[];
      if (artist) dispatch(actions.searchSuccess(artist)); // dispatching action which will create a new state version
      return artist?.idArtist; // returning information to be used locally by the component
    },
    [dispatch]
  );
  return useMemo(() => ({ searchArtist }), [searchArtist]); // returing callbacks
};

/** insde component */
const { state } = useContext(GlobalContext);
const { searchArtist } = useArtistEffect();

const id = await searchArtist('search criteria'); // searching for artist and storing the searched artist's id *probably in a local state*
const artist = state.artist.artistMap[searchState.id]; // accessing the global state where all *up to date* artists are stored and selecting the artist this components needed to fetch
```

<br/>
<br/>

## Testing

> This project is prepared to be tested **without the need** of using tools such as _jest.mock_. Instead it uses strategies like **dependency injection**

#### Testing a component that consumes the global state provider

```typescript
describe('Item', () => {
  it('should render', () => {
    const { toJSON } = render(
      <GlobalProvider // A provider is created using the real "GlobalProvider". In this case, we pass down the provider's props our mock dependencies and inital state
        deps={getMockDeps()}
        initState={{ ...initialState, artist: { ...initialState.artist, artistMap: { [getArtist_1().idArtist]: getArtist_1() } } }}
      >
        <Item route={{ params: { id: getArtist_1().idArtist } }} /> // Routes in this case are consumed by props
      </GlobalProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
```

#### Testing a custom side effect that uses the global state provider

- Note in this case we are using the \*real combined reducers** to also test integration with the state management system. If we wanted to isolate this test to strictly unit test this hook, we could customize the **GlobalProivder** to take a the **combined reducers\*\* function or map as a prop with whatever mock we need.

```typescript
it('should fetch an artist', async () => {
  const deps = getMockDeps(); // mock dependencies
  deps.apiService.request = () => Promise.resolve({ json: () => Promise.resolve({ artists: [getArtist_1()] }) }); // customizing a dependency to fit this test
  const wrapper = ({ children }: any) => <GlobalProvider deps={deps}>{children}</GlobalProvider>; // wrapper to be used by "@testing-library/react-hooks" so we can access the global state provider
  const { result } = renderHook(() => useArtistEffect(), { wrapper });
  let id: string;
  await act(async () => {
    id = await result.current.searchArtist(getArtist_1().strArtist); // getting the id returned by our custom hook (expected to be the one we customized on the mock dependencies)
  });

  expect(deps.stateSnapshot.set).toBeCalledTimes(2); // global state was set 2 times (one by the initial setup and one by this hook's execution)
  expect(deps.stateSnapshot.set).toBeCalledWith({
    ...initialState,
    artist: { ...initialState.artist, artistMap: { [getArtist_1().idArtist]: getArtist_1() } } // global state was set by this hook with the expected data from our mock
  });
  expect(id).toEqual(getArtist_1().idArtist); // id returned by this hook is the one in our mock dependency
});
```
