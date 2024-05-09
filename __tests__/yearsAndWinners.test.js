import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import YearsAndWinners from "../src/pages/components/yearsAndWinners";

/**
 * This test function should teste bouth tables that shows
 * List years with multiple winners
 * and
 * Top 3 studios with winners
 */
describe("Test yearsAndWinners component", () => {
  test("renders loading spinner when loading prop is true", () => {
    const { container } = render(
      <YearsAndWinners
        multWinners={[]}
        loading={true}
        changeTable={true}
        topWinners={[]}
      />
    );

    expect(container.querySelector(".spinner-border")).toBeInTheDocument();
  });

  test("renders correct table when loading prop is false", () => {
    const multWinners = [
      { year: 2000, winnerCount: 3 },
      { year: 2001, winnerCount: 2 },
    ];

    const { getByText } = render(
      <YearsAndWinners
        multWinners={multWinners}
        loading={false}
        changeTable={true}
        topWinners={[]}
      />
    );

    expect(getByText("List years with multiple winners")).toBeInTheDocument();

    expect(getByText("Year")).toBeInTheDocument();
    expect(getByText("Win Count")).toBeInTheDocument();

    multWinners.forEach(({ year, winnerCount }) => {
      expect(getByText(year.toString())).toBeInTheDocument();
      expect(getByText(winnerCount.toString())).toBeInTheDocument();
    });
  });

  test("renders correct table when changeTable prop is false", () => {
    const topWinners = [
      { name: "Studio A", winCount: 5 },
      { name: "Studio B", winCount: 4 },
    ];

    const { getByText } = render(
      <YearsAndWinners
        multWinners={[]}
        loading={false}
        changeTable={false}
        topWinners={topWinners}
      />
    );

    expect(getByText("Top 3 studios with winners")).toBeInTheDocument();

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Win Count")).toBeInTheDocument();

    topWinners.forEach(({ name, winCount }) => {
      expect(getByText(name)).toBeInTheDocument();
      expect(getByText(winCount.toString())).toBeInTheDocument();
    });
  });
});
