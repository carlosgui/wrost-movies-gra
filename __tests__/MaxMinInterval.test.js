import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MaxMinInterval from "../src/pages/components/maxMinInterval"; // Adjust the import path as needed

describe("MaxMinInterval component", () => {
  test("renders table with provided content", () => {
    // Mock content data
    const content = [
      {
        producer: "Producer 1",
        interval: "Interval 1",
        previousWin: "Prev 1",
        followingWin: "Next 1",
      },
      {
        producer: "Producer 2",
        interval: "Interval 2",
        previousWin: "Prev 2",
        followingWin: "Next 2",
      },
    ];

    // Render the component with mock content
    const { getByText } = render(<MaxMinInterval content={content} />);

    // Assert that table headers are rendered
    expect(getByText("Producer")).toBeInTheDocument();
    expect(getByText("Interval")).toBeInTheDocument();
    expect(getByText("Previous Year")).toBeInTheDocument();
    expect(getByText("Following Year")).toBeInTheDocument();

    // Assert that content data is rendered
    content.forEach(({ producer, interval, previousWin, followingWin }) => {
      expect(getByText(producer)).toBeInTheDocument();
      expect(getByText(interval)).toBeInTheDocument();
      expect(getByText(previousWin)).toBeInTheDocument();
      expect(getByText(followingWin)).toBeInTheDocument();
    });
  });
});
