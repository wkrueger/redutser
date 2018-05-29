# redutser

[![npm version](https://badge.fury.io/js/redutser.svg)](https://badge.fury.io/js/redutser)

_Type-safe action creators and reducers for redux and typescript._

## In a nutshell

Allows you to write type-safe reducers with fewer keystrokes. _Just write the
functions_, the lib cares about the action creators and the types.

**Expects ts 2.8+**

### Why this?

This lib is mainly focused on generating accurate typing from your code. No `any`s or `{}`. The reducer-writing pattern here is absolutely nothing new, but it's combination with inference will allow you to write redux code in a shorter way than most of the other options around.

[Moreover...](https://github.com/wkrueger/redutser/blob/master/blog/2018-05-08-why-this.md)

## createRedutser( initialState, actionsDict ): Redutser

`actionsDict` is an object which keys will become the _action types_, and which values
will become the _reducer logic_.


```typescript
import { createRedutser } from 'redutser'

const initialState = {
  newsFeed: [] as NewsArticle[],
  editArticleDialog: undefined as
    { articleId: number, content: string } | undefined
}

const newsRedutser = createRedutser(
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
```

When writing the `actionDict` (second parameter), it is expected that:

  - Each value is a function with shape `(prevState: State, action: A) => State`;
  - The `State` type is inferred from the initial state you formerly passed as the 1st argument;
  - You need to supply the second argument's type.
  - You write `actionsDict` directly inside the `createRedutser` call ("inline"), otherwise
  you'd need to duck-type the `State` type for every item.

Using `this`? [See caveat](#this-usage).

The returning object has the following properties:

### Redutser#reducer

The generated reducer function, which you can directly feed into `createStore` or compose
with another reducer.

```ts
// .reducer has a reducer with exactly the shape you are thinking of.
const store = createStore( newsRedutser.reducer )
```

### Redutser#creators

A collection of action creators, properly named and typed according to the `actionDict` you
previously supplied.


```ts
// .actionCreators contains an action creator map
const actions = newsRedutser.creators
store.dispatch(actions.feed_append({ articles: [getArticle(5)] }))
```

### Redutser#actionTypes

This exports the generated reducer's action type. Which is a union of all of the possible
action inputs. You can use this to describe really accurate dispatch functions.

```ts
function someThing( dispatcher: (payload: typeof newsRedutser.actionTypes) => void ) {
  dispatcher({
    type: 'feed_append',
    payload : {
      articles: [ getArticle(5) ]
    }
  })
}
```

Note: this meant to be always used with `typeof`.

## subdomain ( "extends" Redutser )

Glues other `redutser`s for a bigger purpose, creating a compound redutser. They are expected to share the same state type.

```typescript
const red1 = createRedutser(initialState, { hello: (state) => { ...state, hello: 'yes' } })
const red2 = createRedutser(initialState, { world: (state) => { ...state, world: 'yes' } })

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

This is an utility which "moves up" the state of the `innerRedutser`.

```typescript
const initialState = {
  itemA: 'a',
  itemB:  3
}

const innerA = createRedutser(initialState.itemA, ... )
const innerB = createRedutser(initialState.itemB, ... )

//this will fail since innerA has a different state position
const meatball = subdomain(initialState, { itemA: innerA })
//this works
const meatball = subdomain(initialState, {
  itemA: liftRedutserState(initialState, 'itemA', innerA),
  itemB: liftRedutserState(initialState, 'itemB', innerB),
})
```

## combineRedutsers ( initialOuterState, innerRedutsers ) : redutser

A shorthand for the example above. The name is on purpose, is "combines" `reduTsers`
which operate on subsets of the root state.

```typescript
const meatball = combineRedutsers(initialState, { itemA: innerA, itemB: innerB })
```


# Known Caveats

  - When actions have no parameters, you will still be required to pass an empty object `{}` to the payload.
  - (Redux) If using redux 3.x, you might want to disable `strictFunctionTypes` compiler options (thats a general redux+ts issue). `4.x` typings work great and are highly recommended.

## <a name="this-usage"></a> Using `this` on createRedutser

Typescript has inference issues when using `this` on createReducer ( [issue](https://github.com/wkrueger/redutser/issues/2) ). You may choose a new "curried" alternate version of the function: `createRedutser2(initialState)({ ...reducer })` which
works better with the inference.



## Building

Check the npm scripts.
