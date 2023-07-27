import { component$, useComputed$, $ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-small-pokemons";

import type { SmallPokemon } from "~/interfaces";

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    console.log({ query, redirect, pathname });
    const offset = Number(query.get("offset") || "0");

    if (isNaN(offset)) throw redirect(301, pathname);
    if (offset < 0) throw redirect(301, pathname);
    if (offset > 1000) throw redirect(301, pathname);

    const pokemons = await getSmallPokemons(offset, 18);
    console.log(pokemons);
    return pokemons;
  }
);

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();
  const nav = useNavigate();

  const currentOffset = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.searchParams);
    return Number(offsetString.get("offset") || 0);
  });

  const prevpage = $(() => {
    if (currentOffset.value < 10) nav("/pokemons/list-ssr");
    else nav(`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`);
  });

  const nextpage = $(() => {
    if (currentOffset.value === 1000) nav("/pokemons/list-ssr");
    else nav(`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset.value} </span>
        <span>Está cargando página {location.isNavigating ? "SI" : "NO"} </span>
      </div>

      <div class="mt-10">
        <button onClick$={prevpage} class="btn btn-primary mr-2">
          Anteriores
        </button>
        <button onClick$={nextpage} class="btn btn-primary mr-2">
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <span class="capitalize">{name}</span>
            <PokemonImage id={Number(id)} />
          </div>
        ))}
      </div>
    </>
  );
});
export const head: DocumentHead = {
  title: "List SSR",
};
