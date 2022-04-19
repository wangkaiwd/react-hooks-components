## React practice

Write some components to study usage of react.

Implement following components:

* Input
* AutoComplete
* Menu
* VirtualList

And implement following simple but useful custom hooks:

* useUpdate
* useUpdateEffect
* useGetSet
* useGetSetState

Test Library:

* jest
* @testing-library/react
* @testing-library/react-hooks

Build Library:

* create-react-app: run project in local
* rollup: generate bundle for production environment

### Usage

Install

```shell
npm install @sppk/antd
```

Use in your code:

```tsx
import { Input } from '@sppk/antd'

const YourComponent = () => {
  const [value, setValue] = useState('')
  const onInputChange = (e) => {
    setValue(e.target.value)
  }
  return <Input value={value} placeholder={'Please input something..'} />
}
```

### Disclaimer

This project only for study purpose, don't use it in production environment!

All of my code learn from following projects source code and make some simplify:

* [react-use](https://github.com/streamich/react-use)
* [ant-design](https://github.com/ant-design/ant-design)

I learn a lot of `React` ecosystem knowledge from this project and record my experiences in here.

If you are also studying `React`, hope this can help you ❤️.



