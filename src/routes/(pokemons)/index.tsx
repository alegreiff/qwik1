import { $, component$ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {
  //Señales y Store: para mantener el estado

  const nav = useNavigate();
  const {
    pokemonId,
    isPokemonVisible,
    showBackImage,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible,
  } = usePokemonGame();

  const goToPokemon = $((id: number) => {
    nav(`pokemon/${id}/`);
  });

  //para arreglos y objetos useStore();

  return (
    <>
      <span class="text-5xl">PoKeKosas</span>
      <span class="text-9xl">{pokemonId.value}</span>

      <div
        style="border: 7px red solid"
        onClick$={() => {
          goToPokemon(pokemonId.value);
        }}
      >
        <PokemonImage
          id={pokemonId.value}
          backImage={showBackImage.value}
          isVisible={isPokemonVisible.value}
        />
      </div>

      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">
          Anterior
        </button>

        <button onClick$={nextPokemon} class="btn btn-primary mr-2">
          Siguientes
        </button>

        <button onClick$={toggleVisible} class="btn btn-primary mr-2">
          {isPokemonVisible.value ? "Ocultar" : "Mostrar"}
        </button>

        <button onClick$={toggleFromBack} class="btn btn-primary">
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
