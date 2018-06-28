## 0.13.0

  - React helpers:
    - `plug`
    - `plugShort`
    - <s>`createEffects`</s> (I gave up)

  - Compiled with ts 2.9
    - typings are incompatible with ts 2.8
    - for ts 2.8 usage, install with `@ts2.8` tag

  - Now distributed as es6 + es modules (instead of commonjs + es3)

  - Some functions wich take redutsers as inputs had theirs `extends <type>` clauses loosened.

**.1** - Readme update.

**.2** - Fix build back to commonjs.

**.3** - Fix `.plug()` requiring `react-redux` when not needed.
