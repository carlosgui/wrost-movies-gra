import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MaxMinInterval from "../src/pages/components/maxMinInterval";

/**
 * This test function should teste bouth tables that shows min and max values of data wins
 * Producer with longest and shortest interval between wins
 * Maximum
 * and
 * Minimum
 */
describe("Test maxMinInterval component", () => {
  test("renders table with provided content", () => {
    // Mock content data to render
    const content = [
      {
        producer: "Producer 1",
        interval: "10",
        previousWin: "2002",
        followingWin: "2012",
      },
      {
        producer: "Producer 2",
        interval: "1",
        previousWin: "2005",
        followingWin: "2006",
      },
    ];

    // Render the component with mock content that we create abouve
    const { getByText } = render(<MaxMinInterval content={content} />);

    // Assert that table headers are rendered
    expect(getByText("Producer")).toBeInTheDocument();
    expect(getByText("Interval")).toBeInTheDocument();
    expect(getByText("Previous Year")).toBeInTheDocument();
    expect(getByText("Following Year")).toBeInTheDocument();

    // Assert that content data is rendered correctly
    content.forEach(({ producer, interval, previousWin, followingWin }) => {
      expect(getByText(producer)).toBeInTheDocument();
      expect(getByText(interval)).toBeInTheDocument();
      expect(getByText(previousWin)).toBeInTheDocument();
      expect(getByText(followingWin)).toBeInTheDocument();
    });
  });
});
