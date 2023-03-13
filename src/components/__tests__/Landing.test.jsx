import {render, screen, fireEvent,} from '@testing-library/react';
import React from 'react';
import {Landing} from '../index';
import {BASE_URL, fecthDataFromApi}  from '../../utils/fetchDataFromApi'; 
import mockAxios from "axios";

jest.mock("axios");
let mockData = {data :[{
    
                "weight": {
                    "imperial": "6 - 13",
                    "metric": "3 - 6"
                },
                "height": {
                    "imperial": "9 - 11.5",
                    "metric": "23 - 29"
                },
    "id": 1,
    "name": "Affenpinscher",
    "bred_for": "Small rodent hunting, lapdog",
    "breed_group": "Toy",
    "life_span": "10 - 12 years",
    "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    "origin": "Germany, France",
    "reference_image_id": "BJa4kxc4X",
}]};

mockAxios.get.mockResolvedValue(mockData);

describe("dog Api Landing page", () => {
  afterEach(jest.clearAllMocks);

  test ('Should render Landing component', () => {
    render(<Landing/>);
    const title = screen.getByTestId('app-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Paw Dictionary");
})
test ('Should render searcbar and verify placeholder text', () => {
    render(<Landing/>);
    const searchbar = screen.getByTestId('app-searchbar');
    expect(searchbar).toBeInTheDocument();
    expect(searchbar).toHaveAttribute("placeholder","Search dog breeds");
})
test ('Should render sort dropdown', () => {
    render(<Landing/>);
    const sortDropDown = screen.getByTestId('app-sort');
    expect(sortDropDown).toBeInTheDocument();
    fireEvent.click(sortDropDown);
})
  test("should hit breeds api and return all breeds", async () => {
    const result = await fecthDataFromApi(`${BASE_URL}/breeds?`);
    expect(result).toBe(mockData);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
  test("should hit search api with query parameter and return only that breed", async () => {
    const result = await fecthDataFromApi(`${BASE_URL}/breeds/search?q=Affenpi`);
    expect(result.data[0].name).toBe("Affenpinscher");
    expect(result).toBe(mockData);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });
});


