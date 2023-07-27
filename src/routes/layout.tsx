import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";
import Navbar from "~/components/shared/navbar/navbar";
import { PokemonProvider } from "~/context";

export default component$(() => {
  useStyles$(styles);

  return (
    <>
      <PokemonProvider>
        <Navbar />
        <div style="background-color: purple">
          <main class="flex flex-col items-center justify-center">
            <Slot />
          </main>
        </div>
      </PokemonProvider>
    </>
  );
});
