import { useEffect, useState } from "react";
import { BreedListAPIREsponse } from "./APIResponsesTypes";

const localCache: any = {};

export default function useBreedList(animal: string): [string[], string] {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      fetchBreed();
    }
    async function fetchBreed() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const data: BreedListAPIREsponse = await res.json();

      localCache[animal] = data?.breeds || [];

      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
