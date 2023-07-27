import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div>
        <span>Lista cliente</span>
      </div>
    </>
  );
});
export const head: DocumentHead = {
  title: "List client",
};
