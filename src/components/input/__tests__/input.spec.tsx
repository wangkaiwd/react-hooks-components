import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import Input from "../input";
import { useState } from "react";

describe("Input", () => {
  it("should render input", () => {
    const { container } = render(<Input />);
    expect(container.querySelector("input")).toBeInTheDocument();
  });
  it("should clear text within input", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const input = screen.getByTestId<HTMLInputElement>("input");
    input.value = "20";
    fireEvent.click(screen.getByTestId("clear"));
    expect(onChange).toBeCalledTimes(1);
    expect(screen.getByTestId("input")).toHaveValue("");
  });
  it("should set value and change value", () => {
    // render(<Input value={10}/>);
  });
  it("should support all attributes of native input", () => {

  });
});
