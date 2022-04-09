import renderer from "react-test-renderer";
import AutoComplete from "../auto-complete";

describe("AutoComplete:", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<AutoComplete dataSource={[{ id: 1, label: "1" }]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should display list when input focus", () => {

  });
  it("should hide list when input blur", () => {

  });
  it("should filter content by input text", () => {

  });
});
