# redutser

[![npm version](https://badge.fury.io/js/redutser.svg)](https://badge.fury.io/js/redutser)

_Type-safe action creators and reducers for redux and typescript._

## In a nutshell

Allows you to write type-safe (plain) reducers and action creators with fewer keystrokes,
with an opinionated approach that encourages code grouping by domain. _Just write the
functions_, let the lib care about the messaging and type slinging.

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

// .actionCreators contains an action creator map
const actions = newsRedutser.creators
store.dispatch(actions.feed_append({ articles: [getArticle(5)] }))

// .actionTypes has only the action type, and it is meant to be always
// used with `typeof`. For use with redux code interop.
function someThing( dispatcher: (payload: typeof newsRedutser.actionTypes) => void ) {
  //generated actions put your second parameter inside "payload"
  dispatcher({
    type: 'feed_append',
    payload : {
      articles: [ getArticle(5) ]
    }
  })
}
```

## subdomain ( "extends" Redutser )

Glues other `redutser`s for a bigger purpose, creating a compound redutser. They are expected to share the same state type.

```typescript
const red1 = redutser(initialState, { hello: (state) => { ...state, hello: 'yes' } })
const red2 = redutser(initialState, { world: (state) => { ...state, world: 'yes' } })

const meatBall = subdomain(initialState, { red1, red2 })
```

Action types from the sources are composed into the `payload` parameter.

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

## liftRedutserState( initialOuterState, key: string, innerRedutser ) : redutser

"Moves up" the state of the `innerRedutser` so you can use it with `subdomain`.

```typescript
const initialState = {
  itemA: 'a',
  itemB:  3
}

const innerA = redutser(initialState.itemA, ... )
const innerB = redutser(initialState.itemB, ... )

//this will fail since innerA has a different state position
const meatball = subdomain(initialState, { itemA: innerA })
//this works
const meatball = subdomain(initialState, {
  itemA: liftRedutserState(initialState, 'itemA', innerA),
  itemB: liftRedutserState(initialState, 'itemB', innerB),
})
```

## combineRedutsers ( initialOuterState, innerRedutsers ) : redutser

A shorthand for the example above.

> Typings for this currently not alright. Use the example above for accurate checking.

```typescript
const meatball = combineRedutsers(initialState, { itemA: innerA, itemB: innerB })
```


## Known Caveats

  - When actions have no parameters, you will still be required to pass an empty object `{}` to the payload.
  - (Redux) If using redux 3.x, you might want to disable `strictFunctionTypes` compiler options. `4.x` typings work great.
  - (TS/VSCode) On some nested structures, editor support may show `any` when it intended to show `...`. Don't be tricked.

## Building

Check the npm scripts.
