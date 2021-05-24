/**
 * @jest-environment jsdom
 */

import { pushToHistory } from '../scripts/router';

describe("router tests", () => {
  test("settings", () => {
    pushToHistory("settings");
    expect(history.state).toStrictEqual({ page: "settings" });
    expect(history.length).toBe(2);
  });

  test("entry", () => {
    pushToHistory("entry", 1);
    expect(history.state).toStrictEqual({ page: "entry1" });
    expect(history.length).toBe(3);
  });

  test("home", () => {
    pushToHistory("");
    expect(history.state).toStrictEqual({});
    expect(history.length).toBe(4);
  });
});
