import { App } from "@/App";
import { render } from "@testing-library/react";

vi.mock("mui-color-input", () => ({
  default: () => <div />,
}));

describe("App", () => {
  it("should render the App component", () => {
    render(<App />);
  });
});
