import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
  id: number;
  size?: number;
  backImage: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(
  ({ id, size = 311, backImage = false, isVisible = false }: Props) => {
    const imageLoaded = useSignal(false);
    //FUNCIÓN para lanzar cambios / efectos secundarios
    useTask$(({ track }) => {
      track(() => id);
      imageLoaded.value = false;
    });

    let srcImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    if (backImage) {
      srcImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    }

    return (
      <div
        class="flex items-center justify-center"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {!imageLoaded.value && <span>Cargando... </span>}

        <img
          src={srcImage}
          width={`${size}`}
          height={`${size}`}
          alt="Imagen pokemon"
          /* style={{ width: `${size}px`, height: "auto" }} */
          onLoad$={() => (imageLoaded.value = true)}
          class={[
            { hidden: !imageLoaded.value, "brightness-0": !isVisible },
            "transition-all",
          ]}
        />
      </div>
    );
  }
);
