import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the counter and increments on click", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /count is/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(button).toHaveTextContent("count is 1");
  });
});
