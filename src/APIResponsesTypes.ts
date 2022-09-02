export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export interface IPet {
  id: number;
  name: string;
  animal: Animal;
  description: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
  location: string;
}

export interface PetAPIResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: IPet[];
}

export interface BreedListAPIREsponse {
  animal: Animal;
  breeds: string[];
}