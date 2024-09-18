import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "@/app/page";

const mockScore = 10;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockScore),
  })
);

describe("App Component", () => {
  it("renders the input field when username is not entered", () => {
    render(<App />);

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  });

  it("disables the button when username is empty", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /go/i });

    expect(button).toBeDisabled();
  });

  it("enables the button when username is entered", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/your name/i);
    const button = screen.getByRole("button", { name: /go/i });
    fireEvent.change(input, { target: { value: "Peep" } });

    expect(button).not.toBeDisabled();
  });

  it("renders the Main component when username is entered and button is clicked", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/your name/i);
    const button = screen.getByRole("button", { name: /go/i });
    fireEvent.change(input, { target: { value: "Peep" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText(/make a guess when you are ready/i)
      ).toBeInTheDocument()
    );
  });
});
