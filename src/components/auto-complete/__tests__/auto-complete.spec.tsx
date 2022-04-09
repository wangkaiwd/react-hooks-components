import renderer from "react-test-renderer";
import AutoComplete from "../auto-complete";
import { fireEvent, render, screen } from "@testing-library/react";

const dataSource = [{ id: 1, label: "1433" }, { id: 2, label: "2" }];
const setup = () => {
  const onChange = jest.fn();
  const wrapper = render(<AutoComplete value="" onChange={onChange} dataSource={dataSource} />);
  return {
    ...wrapper,
    onChange
  };
};
describe("AutoComplete:", () => {
  it("should render correctly", () => {
    const tree = renderer.create(
      <AutoComplete
        value=""
        onChange={() => {}}
        dataSource={[{ id: 1, label: "1" }]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should display list when input focus", () => {
    const { container } = setup();
    const input = screen.getByTestId("input");
    fireEvent.focus(input);
    expect(container.querySelector(".ant-auto-complete-popover")).toBeInTheDocument();
  });
  it("should hide list when input blur", () => {
    const { container } = setup();
    const input = screen.getByTestId("input");
    fireEvent.blur(input);
    expect(container.querySelector(".ant-auto-complete-popover")).not.toBeInTheDocument();
  });
  it("should filter content by input text", () => {
    setup();
    const input = screen.getByTestId("input");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "1" } });
    expect(screen.getByTestId("popover")).toHaveTextContent("14");
    fireEvent.change(input, { target: { value: "2" } });
    expect(screen.getByTestId("popover")).toHaveTextContent("2");
    fireEvent.change(input, { target: { value: "" } });
    // todo: Empty text may be have better resolution
    expect(screen.getByTestId("popover")).toHaveTextContent("no content");
  });
});
