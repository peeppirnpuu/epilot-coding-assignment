import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import Main from "@/components/Main";

const mockBTCPrice = 10000;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockBTCPrice),
  })
);

describe("Main Component", () => {
  it("renders the score", () => {
    render(<Main savedScore={10} username="Peep" />);

    const scoreLabel = screen.getByText(/score:/i);
    const scoreValue = within(scoreLabel.closest("div")).getByText(/10/i);

    expect(scoreValue).toBeInTheDocument();
  });

  it("renders the prediction buttons", () => {
    render(<Main username="Peep" />);

    expect(screen.getByText(/up/i)).toBeInTheDocument();
    expect(screen.getByText(/down/i)).toBeInTheDocument();
  });

  it("handles click on prediction buttons", async () => {
    render(<Main username="Peep" />);

    const button = screen.getByTestId(/up/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/you made a guess/i)).toBeInTheDocument();
    });
  });

  it("renders the App component when restart button is clicked", async () => {
    const mockShowEntryPage = jest.fn();

    render(<Main showEntryPage={mockShowEntryPage} username="Peep" />);

    const button = screen.getByTestId(/restart/i);
    fireEvent.click(button);

    expect(mockShowEntryPage).toHaveBeenCalled();
  });
});
