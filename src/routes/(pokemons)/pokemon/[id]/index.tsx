import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);
  if (isNaN(id)) throw redirect(301, "/");
  if (id <= 0) throw redirect(301, "/");
  if (id > 1000) throw redirect(301, "/");

  return id;
});

export default component$(() => {
  const { toggleFromBack, toggleVisible, isPokemonVisible, showBackImage } =
    usePokemonGame();

  //const pokemonGame = useContext(PokemonGameContext);

  const pokemonId = usePokemonId();
  //const loc = useLocation();

  return (
    <>
      {/* <span class="text-5xl">Pokemon número {loc.params.id}</span> */}
      <span class="text-5xl">Pokemon número {pokemonId}</span>
      <PokemonImage
        id={pokemonId.value}
        isVisible={isPokemonVisible.value}
        backImage={showBackImage.value}
      />
      <div class="mt-2">
        <button onClick$={toggleVisible} class="btn btn-primary mr-2">
          {isPokemonVisible.value ? "Ocultar" : "Mostrar"}
        </button>
        <button onClick$={toggleFromBack} class="btn btn-primary ">
          Girar
        </button>
      </div>
    </>
  );
});
