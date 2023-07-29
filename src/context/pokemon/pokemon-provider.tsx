import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import {
  type PokemonListState,
  type PokemonGameState,
  PokemonListContext,
  PokemonGameContext,
} from "~/context";

export const PokemonProvider = component$(() => {
  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 4,
    isPokemonVisible: false,
    showBackImage: true,
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon-game")) {
      const data = JSON.parse(
        localStorage.getItem("pokemon-game")!
      ) as PokemonGameState;

      pokemonGame.isPokemonVisible = data.isPokemonVisible;
      pokemonGame.pokemonId = data.pokemonId;
      pokemonGame.showBackImage = data.showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isPokemonVisible,
      pokemonGame.pokemonId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
