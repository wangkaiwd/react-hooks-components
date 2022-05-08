import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import VirtualList from "../index";

const data: any[] = [];
for (let i = 0; i < 100; i++) {
  data.push({ id: i });
}
describe("VirtualList:", () => {
  const genList = () => render(
    <VirtualList height={300} itemHeight={30} data={data} itemKey={"id"}>
      {(item, i) => <div style={{ height: "30px" }}>{i}</div>}
    </VirtualList>
  );
  it("should render successfully", () => {
    const tree = renderer.create(
      <VirtualList height={300} itemHeight={30} data={data} itemKey={"id"}>
        {(item, i) => <div style={{ height: "30px" }}>{i}</div>}
      </VirtualList>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should only render items in visible view", () => {
    const { container } = genList();
    const wrapper = container.querySelector(".ant-virtual-list-wrapper");
    expect(wrapper?.children.length).toBeLessThan(data.length);
  });
  it("should only render items in visible view when list container scroll", () => {
    const { container } = genList();
    fireEvent.scroll(container.firstChild!, { target: { scrollTop: 10 } });
    const wrapper = container.querySelector(".ant-virtual-list-wrapper");
    expect(wrapper?.children.length).toBeLessThan(data.length);
  });
});
