import type { Person, Actress } from "./types.ts";

function isActress(datas: unknown): datas is Actress {
  return (
    typeof datas === "object" &&
    datas !== null &&
    "id" in datas && typeof datas.id === "number" &&
    "name" in datas && typeof datas.name === "string" &&
    "birth_year" in datas && typeof datas.birth_year === "number" &&
    "death_year" in datas && typeof datas.death_year === "number" &&
    "biography" in datas && typeof datas.biography === "string" &&
    "image" in datas && typeof datas.image === "string" &&

    "most_famous_movies" in datas &&
    datas.most_famous_movies instanceof Array &&
    datas.most_famous_movies.length === 3 &&
    datas.most_famous_movies.every(m => typeof m === "string") &&

    "awards" in datas && typeof datas.awards === "string" &&
    "nationality" in datas && typeof datas.nationality === "string"
  )
};

async function getActress(id: number): Promise<Actress | null> {
  try {

    const res = await fetch(`http://localhost:3333/actresses/${id}`);
    const data: unknown = await res.json();

    if (!isActress(data)) {
      throw new Error("Formato dati non valido");
    };

    return data;

  } catch (error) {

    console.error(error);
    return null;

  };
};

async function getAllActresses(): Promise<Actress[]> {
  try {

    const res = await fetch(`http://localhost:3333/actresses`);
    const data: unknown = await res.json();

    if (!(data instanceof Array)) {
      throw new Error("Formato dati non valido: non è un array");
    };

    const validActress: Actress[] = data.filter(isActress);
    return validActress;

  } catch (error) {

    console.error(error);
    return [];

  };
};

async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {

    const promises = ids.map(id => getActress(id));
    return await Promise.all(promises);

  } catch (error) {

    console.error(error);
    return [];

  };
};