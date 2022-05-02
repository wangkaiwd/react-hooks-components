## Virtual List Component

### API

height must fix ?

* dataSource
* containerHeight

Combine with custom list

### Knowledge

* type of `event.target` and `event.currentTarget`
  * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508
* cloneElement:

```jsx
const newProps = { a: 1 }
const element = <div>1</div>
<element.type {...element.props} {...newProps}></element.type>
```

* children:
  * can pass by `props` (`<Component children={['1']}>children</Component>`), it will override `children` which
    inside `component`
* [Use multiple refs for an array of elements with hooks ?](https://stackoverflow.com/a/56063129/12819402)

### Todo

[ ] Optimization test with chrome
[ ] scroll distance little then one item height not update transform

### Problems

1. Display how many length items in DOM at once ?
2. How to calculate container height when list item has margin ?
3. How to update start and end when scroll ?
4. Why need pass minimum height of item ?

### Resource

* [simple demo](https://jsfiddle.net/97evysno/)
* [forward refs](https://reactjs.org/docs/forwarding-refs.html)
* [refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

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
