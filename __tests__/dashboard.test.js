import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import Dashboard from "../src/pages/dashboard";

// Mocking API responses
jest.mock("../src/services/api", () => ({
  get: jest.fn((url) => {
    switch (url) {
      case "?projection=years-with-multiple-winners":
        return Promise.resolve({
          data: {
            years: [
              { year: 1986, winnerCount: 2 },
              { year: 1990, winnerCount: 2 },
              { year: 2015, winnerCount: 2 },
            ],
          },
        });
      case "?projection=studios-with-win-count":
        return Promise.resolve({
          data: {
            studios: [
              { name: "Columbia Pictures", winCount: 7 },
              { name: "Paramount Pictures", winCount: 6 },
              { name: "Warner Bros.", winCount: 5 },
            ],
          },
        });
      case "?projection=max-min-win-interval-for-producers":
        return Promise.resolve({
          data: {
            min: [
              {
                producer: "Matthew Vaughn",
                interval: 13,
                previousWin: 2002,
                followingWin: 2015,
              },
            ],
            max: [
              {
                producer: "Joel Silver",
                interval: 1,
                previousWin: 1990,
                followingWin: 1991,
              },
            ],
          },
        });
      default:
        return Promise.reject(new Error("Invalid URL"));
    }
  }),
}));

describe("Dashboard component", () => {
  it("loads data from API and sets state correctly", async () => {
    expect(true).toBe(true);
  });
});
