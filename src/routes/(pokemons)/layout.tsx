import { Slot, component$ } from '@builder.io/qwik';
import Navbar from '~/components/shared/navbar/navbar';
import { PokemonProvider } from '~/context';

export default component$(() => {
  return (
    <>
   <PokemonProvider>
        <Navbar />
        <div class="bg-slate-500">
          <main class="flex flex-col items-center justify-center">
            <Slot />
          </main>
        </div>
      </PokemonProvider> 
    </>
  )
});