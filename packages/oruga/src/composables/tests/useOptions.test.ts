import { describe, test, beforeEach, vi, expect } from "vitest";
import { isGroupOption, normalizeOptions } from "../useOptions";

describe("useOptions tests", () => {

  const UUID = "123";
  beforeEach(() => {
    vi.mock('crypto', () => ({ randomUUID: vi.fn(() => UUID) }));
  })

  describe("test normalizeOptions", () => {

    test.todo("test empty list");

    test("test options object", () => {
      const options = { 'foo': 'bar', 'a': 'b' };
      const normOptions = normalizeOptions(options);

      expect(normOptions).toEqual([
        {
          label: 'foo',
          value: 'bar',
          key: UUID,
        },
        {
          label: 'a',
          value: 'b',
          key: UUID,
        },
      ])
    });

    test("test options array of strings", () => {
      const options = ['foo', 'bar'];
      const normOptions = normalizeOptions(options);

      expect(normOptions).toEqual([
        {
          label: 'foo',
          value: 'foo',
          key: UUID,
        },
        {
          label: 'bar',
          value: 'bar',
          key: UUID,
        },
      ])
    });

    test("test options array of objects", () => {
      const options = [{ label: 'foo', value: 'bar' }, { label: 'a', value: 'b' }];
      const normOptions = normalizeOptions(options);

      expect(normOptions).toEqual([
        {
          label: 'foo',
          value: 'bar',
          key: UUID,
        },
        {
          label: 'a',
          value: 'b',
          key: UUID,
        },
      ])

    });

    test("test can recursively handle options with nested groups", () => {
      const options =
      {
        group: 'foo',
        options: ['#ff985d', '#f7ce68', '#FFFFFF', '#2b2b35'],
      },
        {
          group: 'Other',
          options: [
            {
              label: 'Red',
              value: '#ff0000',
            },
          ],
        },
      const normOptions = normalizeOptions(options);

      expect(normOptions).toEqual([
        {
          group: 'foo',
          options: [
            {
              label: '#ff985d',
              value: '#ff985d',
            },
            {
              label: '#f7ce68',
              value: '#f7ce68',
            },
            {
              label: '#FFFFFF',
              value: '#FFFFFF',
            },
            {
              label: '#2b2b35',
              value: '#2b2b35',
            },
          ],
        },
        {
          group: 'Other',
          options: [
            {
              label: 'Red',
              value: '#ff0000',
            },
          ],
        },
      ])
    });

    test("testcan recursively handle options with groups of objects", () => {
      const options = [
        {
          group: 'Foo',
          options: [
            { label: 'A', value: 0 },
            { label: 'B', value: 1 },
          ],
        },
        {
          group: 'Bar',
          options: [
            { label: 'D', value: 3 },
            { label: 'E', value: 4 },
          ],
        },
      ];

      const normOptions = normalizeOptions(options);
      expect(normOptions).toEqual([
        {
          group: 'Foo',
          options: [
            { label: 'A', value: 0 },
            { label: 'B', value: 1 },
          ],
        },
        {
          group: 'Bar',
          options: [
            { label: 'D', value: 3 },
            { label: 'E', value: 4 },
          ],
        },
      ])
    })
  });


  describe("test isGroupOption", () => {
    test("test is normal option item", () => {
      const option = { label: 'foo', value: 'bar' };
      expect(isGroupOption(option)).toBeFalsy();
    });
    test("test is group option item", () => {
      const option = { group: "my group", options: [{ label: 'foo', value: 'bar' }] };
      expect(isGroupOption(option)).toBeTruthy();
    });
  });


  describe("test toOptionsGroup", () => {
    test.todo("test empty list");
    test.todo("test is normal options");
    test.todo("test is group options");

  });


  describe("test toOptionsList", () => {
    test.todo("test empty list");
    test.todo("test group options to option item list ");

  });



  describe("test filterOptionsItems", () => {
    test.todo("test empty list");
    test.todo("test filter by valid value");
    test.todo("test filter by invalid value");
    test.todo("test filter with custom function");

  });

  describe("test checkOptionsEmpty", () => {
    test.todo("test empty list");
    test.todo("test list with hidden option");
    test.todo("test list without hidden options");
    test.todo("test list with and without hidden options");

  });


  describe("test findOption", () => {
    test.todo("test empty list");
    test.todo("test filter by valid value");
    test.todo("test filter by invalid value");
    test.todo("test group options filter by valid value");
    test.todo("test group options filter by invalid value");

  });



  describe("test firstValidOption", () => {
    test.todo("test empty list");
    test.todo("test list with hidden option");
    test.todo("test list without hidden options");
    test.todo("test list with and without hidden options");

  });

  describe("test isOptionValid", () => {
    test.todo("test empty list");
    test.todo("test valid option");
    test.todo("test invalid option");

  });
});