import { sortDogs, debounce , formatObj} from '../../utils/helperFunctions';
import * as sinon from 'sinon';

let mockDataSortArray = [
    {
        name: 'Zean',
        height: 150,
        age: 25
    },
    {
        name: 'Tom',
        height: 170,
        age: 33
    },
    {
        name: 'Lily',
        height: 163,
        age: 28
    }
]
let mokDataFormatObj = [
{
    height: {
        "imperial": "21 - 25",
        "metric": "53 - 64"
        },
    life_span:"12 - 14 years"
},
{
    height: {
        "imperial": "21 - 25",
        "metric": "20 - 24"
        },
    life_span:"8 - 10 years"
}
]
let mockResultFormatObj = [
    {
        height: {
            "imperial": "21 - 25",
            "metric": "53 - 64"
            },
        life_span:"12 - 14 years",
        heightFormatted: 53,
        lifeSpanFormatted: 12
    },
    {
        height: {
            "imperial": "21 - 25",
            "metric": "20 - 24"
            },
        life_span:"8 - 10 years",
        heightFormatted: 20,
        lifeSpanFormatted: 8
    }
    
]

describe("Test helper functions", () => {
    test('sortArray function sort by name', () => {
        expect(sortDogs(mockDataSortArray, "name", "asc")).toEqual(
            [
                {
                    name: 'Lily',
                    height: 163,
                    age: 28
                },
                {
                    name: 'Tom',
                    height: 170,
                    age: 33
                },
                {
                    name: 'Zean',
                    height: 150,
                    age: 25
                }
            ]
        )
    })
    test('sortArray function sort by height', () => {
        expect(sortDogs(mockDataSortArray, "height", "asc")).toEqual(
            [
                {
                    name: 'Zean',
                    height: 150,
                    age: 25
                },
                {
                    name: 'Lily',
                    height: 163,
                    age: 28
                },
                {
                    name: 'Tom',
                    height: 170,
                    age: 33
                },

            ]
        )
    })
    test('sortArray function sort by age', () => {
        expect(sortDogs(mockDataSortArray, "age", "asc")).toEqual(
            [
                {
                    name: 'Zean',
                    height: 150,
                    age: 25
                },
                {
                    name: 'Lily',
                    height: 163,
                    age: 28
                },
                {
                    name: 'Tom',
                    height: 170,
                    age: 33
                },

            ]
        )
    })
    test('Debounce function to be called after 1 second', () => {
        const func = jest.fn();
        const debounceFunc = debounce(func);
        let clock = sinon.useFakeTimers();
        debounceFunc();
        expect(func).toHaveBeenCalledTimes(0);
        clock.tick(1000);
        expect(func).toHaveBeenCalledTimes(1); 
      });
    test ('Format Object function', () => {
        expect(formatObj(mokDataFormatObj)).toEqual(mockResultFormatObj)
    })
})