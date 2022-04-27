## Input

React [controlled component](https://reactjs.org/docs/forms.html#controlled-components)
vs [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html)

### TypeScript

component `props` extends `DOM` element native attributes and also can override native properties with own properties:

* [sample code](https://github.com/react-component/input/blob/e6c1481aadf47026cf88148227cc262af077687e/src/interface.ts#L42-L44)
* [interface incorrectly extends interface, sub interface method overload OR override](https://github.com/microsoft/TypeScript/issues/20920#issuecomment-496819809)

### Issue

* [React's onChange relates to onInput](https://github.com/facebook/react/issues/3964)
  * [onChange](https://reactjs.org/docs/dom-elements.html#onchange)
* [support controlled and uncontrolled component](https://github.com/react-component/input/blob/e6c1481aadf47026cf88148227cc262af077687e/src/Input.tsx#L42)
  * useMergedState: maintain internal value and update it when external value update

### Todo

* uncontrolled component with `ref` how to work ?
