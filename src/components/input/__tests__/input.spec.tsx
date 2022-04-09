import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Input from "../input";

describe("Input", () => {
  it("should render correctly", () => {
    const input = renderer.create(<Input placeholder="Please input something..." />).toJSON();
    expect(input).toMatchSnapshot();
  });
  it("should clear text within input", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} value="20" />);
    fireEvent.click(screen.getByTestId("clear"));
    expect(onChange).toBeCalledTimes(1);
    expect(screen.getByTestId("input")).toHaveValue("");
  });
  it("should trigger change with parameter value", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const input = screen.getByTestId("input");
    // only need to trigger input event
    fireEvent.change(input, { target: { value: "10" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("10");
  });
  it("should support all attributes of native input", () => {
    const placeholder = "Please input";
    const maxLength = 10;
    const { container } = render(<Input placeholder={placeholder} maxLength={maxLength} />);
    const input = container.querySelector("input");
    expect(input?.getAttribute("placeholder")).toBe(placeholder);
    expect(input?.getAttribute("maxlength")).toBe(String(maxLength));
  });
});
