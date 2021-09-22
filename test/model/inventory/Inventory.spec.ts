import Inventory from "../../../lib/model/space/storage/Inventory";

describe("Inventory test suite", () => {
  const inventory = new Inventory<String>();

  beforeEach(() => {
    inventory.reset(10, 10, 2);
    for (let k: number = 0; k < 2; k++) {
      for (let i: number = 0; i < 10; i++) {
        for (let j: number = 0; j < 10; j++) {
          inventory.addAt(i, j, k, "my_item_" + i + "_" + j + "_" + k);
        }
      }
    }
  });

  describe("#getNumPlacesLeft", () => {
    const testData = [
      {
        remove: [{ row: 2, col: 2, layer: 1 }],
        expected: 199,
      },
      {
        remove: [
          { row: 2, col: 2, layer: 1 },
          { row: 2, col: 8, layer: 1 },
        ],
        expected: 198,
      },
      {
        remove: [
          { row: 2, col: 2, layer: 1 },
          { row: 2, col: 8, layer: 1 },
          { row: 2, col: 7, layer: 1 },
        ],
        expected: 197,
      },
    ];

    testData.forEach((current) => {
      it(`it should be able to say how much places left in the inventory for ${current}`, () => {
        // given
        current.remove.forEach((removeData) => {
          inventory.removeAt(removeData.row, removeData.col, removeData.layer);
        });

        // when
        const result = inventory.getNumPlacesLeft();

        // then
        expect(result).toEqual(current.expected);
      });
    });
  });

  describe("#getItemsEqualTo", () => {
    it("should return the items equal to (according to an equal function)", () => {
        const testData = [
            {
                func: (item: string) => item === "my_item_0_0_0",
                expected: [{row: 0, col: 0, layer: 0, value: "my_item_0_0_0"}]
            }, 
            {
                func: (item: string) => item.includes("my_item_0_0"),
                expected: [
                    {row: 0, col: 0, layer: 0, value: "my_item_0_0_0"},
                    {row: 0, col: 0, layer: 1, value: "my_item_0_0_1"},
                ]
            }
        ];

        testData.forEach( 
            (data)=>{
                const result = inventory.getItemsEqualTo<string>(data.func);
                expect(result).toEqual(data.expected);
            }
        );
    });
  });
});
