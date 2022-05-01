## Virtual List Component

### API

height must fix ?

* dataSource
* containerHeight

Combine with custom list

### Knowledge

* type of `event.target` and `event.currentTarget`
  * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508

### Todo

[] Optimization test with chrome

### Problems

1. Display how many length items in DOM at once ?
2. How to calculate container height when list item has margin ?
3. How to update start and end when scroll ?

### Resource

* [simple demo](https://jsfiddle.net/97evysno/)
* [forward refs](https://reactjs.org/docs/forwarding-refs.html)
* [refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

### Scroll DOM Manipulate

* scroll event trigger has interval which depend on your mouse wheel scroll speed
* keep visible element always in user's visual
  * `position: absolute; top: xxx;`
  * `transform: translateY(xxx);`
