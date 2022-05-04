import React, {
  cloneElement,
  CSSProperties,
  HTMLAttributes,
  UIEvent,
  useMemo,
  useRef,
  useState
} from "react";
import cls from "classnames";
import "./index.scss";

interface VirtualListProps extends HTMLAttributes<HTMLDivElement> {
  height: number,
  // this is minimum height
  itemHeight: number,
  data: any[],
  itemKey: string | number,
  children: (item: any, i: number) => JSX.Element
}

// Render additional one item for motion usage
const prefixCls = "ant-virtual-list";
const VirtualList = (props: VirtualListProps) => {
  const { className, height, itemHeight, data, itemKey, style, onScroll, ...rest } = props;
  const classes = cls(className, prefixCls);
  const outerStyles: CSSProperties = {
    height: `${height}px`
  };
  const [scrollTop, setScrollTop] = useState(0);
  // todo: handle dom node and react node(fragment) ?
  const itemsRef = useRef(new Map<VirtualListProps["itemKey"], number>());
  const getKey = (item: any) => {
    return item[itemKey];
  };
  // 1. cache render height, first render will use itemHeight
  // 2. start: first item index : scrollTop > item bottom
  // 3. total height: for loop all items and get sum of each item(bottom)
  // 4. offset: start index top and change over start index
  const { start, end, offset, scrollHeight } = useMemo(() => {
    const dataLen = data.length;
    const heights = itemsRef.current;

    let itemTop = 0;
    let startIndex: number | undefined;
    let startOffset: number | undefined;
    let endIndex: number | undefined;

    for (let i = 0; i < dataLen; i += 1) {
      const item = data[i];
      const key = getKey(item);
      // cache items height once item rendered
      // mouse scroll must trigger scroll event multiple times (theoretically speaking will calculate mislead when fist render new item, but this can't appear in real life)
      const cacheHeight = heights.get(key);

      const currentItemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight);
      // Check item top in the range
      if (currentItemBottom >= scrollTop && startIndex === undefined) {
        startIndex = i;
        startOffset = itemTop;
      }

      // Check item bottom in the range. We will render additional one item for motion usage
      if (currentItemBottom > scrollTop + height && endIndex === undefined) {
        endIndex = i;
      }
      itemTop = currentItemBottom;
    }

    // Fallback to normal if not match. This code should never reach
    /* istanbul ignore next */
    if (startIndex === undefined) {
      startIndex = 0;
      startOffset = 0;
    }
    if (endIndex === undefined) {
      endIndex = dataLen - 1;
    }
    console.log("itemTop, startIndex, endIndex, startOffset, heights", itemTop, startIndex, endIndex, startOffset, JSON.stringify(Array.from(heights)));
    // Give cache to improve scroll experience
    endIndex = Math.min(endIndex + 1, dataLen);
    return {
      scrollHeight: itemTop,
      start: startIndex,
      end: endIndex,
      offset: startOffset
    };
  }, [scrollTop]);
  // itemsHeight: {k1:number,k2:number}
  const setItemsRef = (el: HTMLElement, item: any) => {
    const key = getKey(item);
    if (!itemsRef.current.has(key)) {
      itemsRef.current.set(key, el.offsetHeight);
    }
  };
  const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop: newScrollTop } = e.currentTarget;
    const maxTop = scrollHeight - height;
    // todo: can optimize this by add event trigger interval
    setScrollTop(newScrollTop > maxTop ? maxTop : newScrollTop);
    onScroll?.(e);
  };

  const getChildList = () => {
    return data.slice(start, end).map((item, i) => {
      const eleIndex = start + i;
      return cloneElement(props.children(item, eleIndex), {
        key: getKey(item),
        ref: (el: HTMLElement) => setItemsRef(el, item)
      });
    });
  };
  console.log("render");
  return (
    <div
      className={classes}
      style={{ ...style, ...outerStyles }}
      {...rest}
      onScroll={scrollHandler}
    >
      <div
        className={cls(`${prefixCls}-inner`)}
        style={{ height: `${scrollHeight}px` }}
      >
        <div
          className={cls(`${prefixCls}-wrapper`)}
          style={{ transform: `translateY(${offset}px)` }}
        >
          {getChildList()}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
