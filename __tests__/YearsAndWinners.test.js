import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import YearsAndWinners from "../src/pages/components/yearsAndWinners";

describe("YearsAndWinners component", () => {
  test("renders loading spinner when loading prop is true", () => {
    const { container } = render(
      <YearsAndWinners
        multWinners={[]}
        loading={true}
        changeTable={true}
        topWinners={[]}
      />
    );

    // Assert that loading spinner is rendered
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

    // Assert that "List years with multiple winners" card title is rendered
    expect(getByText("List years with multiple winners")).toBeInTheDocument();

    // Assert that table headers are rendered
    expect(getByText("Year")).toBeInTheDocument();
    expect(getByText("Win Count")).toBeInTheDocument();

    // Assert that rows with year and winner count are rendered
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

    // Assert that "Top 3 studios with winners" card title is rendered
    expect(getByText("Top 3 studios with winners")).toBeInTheDocument();

    // Assert that table headers are rendered
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Win Count")).toBeInTheDocument();

    // Assert that rows with studio name and win count are rendered
    topWinners.forEach(({ name, winCount }) => {
      expect(getByText(name)).toBeInTheDocument();
      expect(getByText(winCount.toString())).toBeInTheDocument();
    });
  });
});
