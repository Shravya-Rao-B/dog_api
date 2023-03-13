import {BASE_URL, fecthDataFromApi}  from '../../utils/fetchDataFromApi'; 
import mockAxios from "axios";

jest.mock("axios");
let mockData =[ 
  {
  "weight": {
      "imperial": "20 - 40",
      "metric": "9 - 18"
  },
  "height": {
      "imperial": "13 - 18",
      "metric": "33 - 46"
  },
  "id": 165,
  "name": "Miniature American Shepherd",
  "breed_group": "Herding",
  "life_span": "12 - 15 years",
  "temperament": "Energetic, Loyal, Intelligent, Trainable",
  "reference_image_id": "BkHHQgcN7",
  "image": {
      "id": "BkHHQgcN7",
      "width": 920,
      "height": 640,
      "url": "https://cdn2.thedogapi.com/images/BkHHQgcN7.jpg"
  }
}]
mockAxios.get.mockResolvedValue(mockData);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    breed: 'Miniature American Shepherd',
  }),
}));

describe("dog component", () => {
  afterEach(jest.clearAllMocks);
  test("should hit search api with query parameter breed and return only that dog", async () => {
    const result = await fecthDataFromApi(`${BASE_URL}/breeds/search?q=Miniature American Shepherd`);
    expect(result).toBe(mockData);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  test("Validate the name of dog returned", async () => {
    const result = await fecthDataFromApi(`${BASE_URL}/breeds/search?q=Miniature American Shepherd`);
    expect(result[0].name).toBe("Miniature American Shepherd");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  test("Validate other objects returned", async () => {
    const result = await fecthDataFromApi(`${BASE_URL}/breeds/search?q=Miniature American Shepherd`);
    expect(result[0].breed_group).toBe("Herding");
    expect(result[0].life_span).toBe("12 - 15 years")
    expect(result[0].height.metric).toEqual("33 - 46")
    expect(result[0].weight.metric).toEqual("9 - 18")
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
})

