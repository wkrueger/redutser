# redutser

_Type-safe action creators and reducers for redux and typescript._

## In a nutshell

Allows you to write type-safe (plain) reducers and action creators with fewer keystrokes,
with an opinionated approach that encourages code grouping  by domain, not by
"framework-function".

**Expects ts 2.8+**

```typescript
import redutser from 'redutser'
import { createStore } from 'redux'

const initialState = {
  newsFeed: NewsArticle[]
  editArticleDialog: undefined as
    { articleId: number, content: string } | undefined
}

// it is recommended that the 2nd param is always declared inline, for
// inference reasons.
const newsRedutser = redutser(
  initialState,
  {
    article_edit : (state, act: { articleId: number, content: string }) => ({
      ...state,
      editArticleDialog : act
    }),
    feed_append : (state, act: { articles: NewsArticle[] }) => ({
      ...state,
      newsFeed : [...state.newsFeed, ...act.articles]
    })
  }
)

// .reducer has a reducer with exactly the shape you are thinking of.
const store = createStore( newsRedutser.reducer )

// .actionCreators contains a type-safe action creator map!
const actions = newsRedutser.creators
store.dispatch(actions.feed_append({ articles: [getArticle(5)] }))

// .actionTypes has the action type, and it is meant to be always used with `typeof`.
// For use with redux code interop.
// If you ask it, in real life, it is just an `undefined`.
function someThing( dispatcher: (payload: typeof newsRedutser.actionTypes) => void ) {
  dispatcher({
    type: 'feed_append',
    payload : {
      articles: [ getArticle(5) ]
    }
  })
}
```

## innerRedutser

An inner redutser does the same thing as a redutser, but doesn't require an initial state.

```typescript
import { innerRedutser } from "redutser"
import { WholeStateType } from "./index"

const reduts = innerRedutser<WholeStateType>()({
  allGood: state => ({
    ...state,
    allGood: true
  })
})
```

## subdomain ( "extends" Redutser )

Glues other `redutser`s for a bigger purpose, creating a compound redutser. They are expected to share the same state type.

```typescript
const red1 = redutser(initialState, { hello: (state) => { ...state, hello: 'yes' } })
const red2 = redutser(initialState, { world: (state) => { ...state, world: 'yes' } })

const meatBall = subdomain(initialState, { red1, red2 })
```

Action types from the sources are composed into the `payload` parameter. Always type-safe and with editor support, as usual.

```typescript
const action: typeof meatBall.actionTypes = {
  type: 'red2',
  payload: {
    type: 'world',
    payload: {}
  }
}) //assigns fine
```

Supplied action creators go one level deeper:

```typescript
store.dispatch(meatBall.creators.red2.world({}))
```
## Utilitary typedefs

Some UTL typedefs also bundled.

### ThunkDispatcher<ActionTypes, State>

A dispatcher function which actually validates its actions, expecting thunk or object.

```tsx
const Component
  : React.SFC<{ dispatch: ThunkDispatcher<typeof meatBall.actionTypes, MyState> }>
  = props => (
    <button onClick={() => props.dispatch(meatBall.creators.red2.world({}))} >
      LISPscript
    </button>
  )
```

## Known Caveats

  - When actions have no parameters, you will still be required to pass an empty object `{}` to the payload.
  - This currently only bothers with "Level 0/plain/vanilla" actions.

## License

MIT
