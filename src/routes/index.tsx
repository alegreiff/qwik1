import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  //Señales y Store: para mantener el estado

  const pokemonId = useSignal(1); //Para valores primitivos (bool, string, number)
  const showBackImage = useSignal(false);
  const isPokeVisible = useSignal(false);
  //Función envuelta en $ hace que sea serializable
  const changePokemonId = $((value: number) => {
    if (pokemonId.value + value <= 0) return;

    pokemonId.value += value;
  });

  //para arreglos y objetos useStore();

  return (
    <>
      <span class="text-5xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <PokemonImage
        id={pokemonId.value}
        backImage={showBackImage.value}
        isVisible={isPokeVisible.value}
      />

      <div class="mt-2">
        <button
          onClick$={() => changePokemonId(-1)}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>

        <button
          onClick$={() => changePokemonId(+1)}
          class="btn btn-primary mr-2"
        >
          Siguientes
        </button>

        <button
          onClick$={() => (isPokeVisible.value = !isPokeVisible.value)}
          class="btn btn-primary mr-2"
        >
          {isPokeVisible.value ? "Ocultar" : "Mostrar"}
        </button>

        <button
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary"
        >
          Girar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "PokeQwik",
  meta: [
    {
      name: "description",
      content: "Mi primera APP con Qwik",
    },
  ],
};
