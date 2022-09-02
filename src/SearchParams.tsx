import { useEffect, useState, useContext, FunctionComponent } from "react";
import ThemeContext from "./ThemeContext";

import Pet from "./Pet";
import useBreedList from "./useBreedList";
import { Animal, IPet, PetAPIResponse } from "./APIResponsesTypes";

//some animals types data(no need to fetch it)
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams: FunctionComponent = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds, status] = useBreedList(animal);
  const [pets, setPets] = useState([] as IPet[]);
  const [breed, setBreed] = useState("");
  const [petStatus, setPetStatus] = useState("unloaded");
  const [theme, setTheme] = useContext(ThemeContext);

  const hundleFetch = async () => {
    try {
      setPetStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );
      const data: PetAPIResponse = await res.json();
      setPets(data.pets);
      setPetStatus("loaded");
    } catch (err) {
      setPetStatus("Error");
    }
  };

  useEffect(() => {
    hundleFetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          hundleFetch();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value as Animal)}
            onBlur={() => setBreed("")}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          {status === "loading" ? (
            <h1> Loading...</h1>
          ) : (
            <select
              id="breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              onBlur={(e) => setBreed(e.target.value)}
            >
              <option />
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          )}
        </label>

        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      {petStatus === "loading" ? (
        <h1>loading...</h1>
      ) : (
        pets.map((pet: IPet) => (
          <Pet
            location={pet.location}
            id={pet.id}
            images={pet.images}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default SearchParams;
