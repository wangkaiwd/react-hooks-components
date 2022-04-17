## React practice

Write some components to study usage of react.

implement following components:

* Input
* AutoComplete
* Menu
* VirtualList
* Form
* Tree
* UpPullRefresh/DownPullMore

And implement following simple but useful custom hooks:

* useUpdate
* useUpdateEffect
* useGetSet
* useGetSetState

### build

* [peerDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependencies)

#### problem

* [duplicate react](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)
  * npm link library (how to resolve ?)
* if `tsx` file import `css`, it will import `css` inside of correspond `.d.ts` file
  * rollup-plugin-dts can resolve this, but this is normally situation ?

### document

### Experience

* useEffect always trigger after component first render, event pass dependencies array to it

### Reference resource

* [react-use](https://github.com/streamich/react-use)
* [ant-design](https://github.com/ant-design/ant-design)
