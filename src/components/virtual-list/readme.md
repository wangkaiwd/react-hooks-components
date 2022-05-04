## Virtual List Component

### API

height must fix ?

* dataSource
* containerHeight

Combine with custom list

### Knowledge

* [simple demo](https://jsfiddle.net/97evysno/)
* [forward refs](https://reactjs.org/docs/forwarding-refs.html)
* type of `event.target` and `event.currentTarget`
  * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508
* cloneElement:

```jsx
const newProps = { a: 1 }
const element = <div>1</div>
<element.type {...element.props} {...newProps}></element.type>
```

* children:
  * can pass by `props` (`<Component children={['1']}>children</Component>`), `children` props will override `children`
    which
    inside `component`
* [Use multiple refs for an array of elements with hooks ?](https://stackoverflow.com/a/56063129/12819402)
  * use map or object `{k:el1,k2:el2}` store refs(in there is `id`)
* [Warning about deprecated findDOMNode usage](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
  * [exposing-dom-refs-to-parent-components](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components)
  * [findDOMNode](https://reactjs.org/docs/react-dom.html#finddomnode)

### Problems

1. Display how many length items in DOM at once ?
   * addition render one item for motion usage
2. How to calculate container height when list item has margin ?
3. How to update start and end when scroll ?
4. Why need pass minimum height of item ?
5. If items has some image which width and height auto, such as waterfall layout (give it minimum item height ?)

### Scroll DOM Manipulate

* scroll event trigger has interval which depend on your mouse wheel scroll speed

```tsx
const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
  const { scrollTop: newScrollTop } = e.currentTarget;
  const maxTop = containerHeight - height;
  // 1. scroll event not trigger when content scroll per one pixel
  // 2. below code will make scroll to bottom not precise
  // 3. newScrollTop update interval depend on speed of mouse wheel scroll speed
  if (newScrollTop <= maxTop) { // incorrect
    setScrollTop(maxTop)
  }
  // setScrollTop(newScrollTop > maxTop ? maxTop : newScrollTop);
};
```

* keep visible element always in user's visual
  * `position: absolute; top: xxx;`
  * `transform: translateY(xxx);`

### Steps

Dynamic item height:

* calculate start
* calculate offset

look scrollbar carefully
