# redutser

_Annihilate the redux boilerplate!_

## In a nutshell

Allows you to write type-safe reducers and action creators with fewer keystrokes, encouraging you to group your code by domain, not by "framework-function".

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

// .reducer creates a reducer with exactly the shape you are thinking of.
const store = createStore( newsRedutser.reducer )

// .actionCreators contains a type-safe action creator map!
const actions = newsRedutser.actionCreators
store.dispatch(actions.feed_append({ articles: [getArticle(5)] }))

// .actionTypes contains undefined, typecasted as the reducers' expected
// action input. `undefined` is there for a reason, this is intended to be
// ALWAYS used with `typeof`, for interop with other existing reducers
// and dispatchers
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

> I should always pass an initial state for a top-level reducer, but I may pardon inner reducers
> which are expected to be called from the top-level reducer.

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

## Coming next

The concept is still in early stages. Probable next things:

* Helpers for typing dispatchers and stores
* How will it work with the common middlewares?

## License

MIT
