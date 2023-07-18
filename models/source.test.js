const Source = require("./source");
const client = require("../database/connect");

jest.mock("../database/connect");
jest.mock("pg");

test("Should fetch all sources", async () => {
  const rows = [
    { sourceid: 1, name: "test_source_1" },
    { sourceid: 2, name: "test_source_2" },
    { sourceid: 3, name: "test_source_3" },
  ];
  const expected = [
    { id: 1, name: "test_source_1" },
    { id: 2, name: "test_source_2" },
    { id: 3, name: "test_source_3" },
  ];
  const resp = { rows: rows };
  client.query.mockResolvedValue(resp);

  const data = await Source.getAll();
  return expect(data).toEqual(expected);
});
