import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./login.css?inline";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

export const useLoginUserAction = routeAction$((data, { cookie, redirect }) => {
  const { email, password } = data;

  if (email === "jaime@supa.es" && password === "123456") {
    cookie.set("jwt", "esto_es_un_jwt-token", { secure: true, path: "/" });
    redirect(302, "/");
    return {
      succes: true,
      jwt: "esto_es_un_jwt-token",
    };
  } else {
    return {
      succes: false,
    };
  }
}, zod$({
  email: z.string().email('No es un correo'),
  password: z.string().min(6, 'Mínimo  seis chars')
}));

export default component$(() => {
  useStylesScoped$(styles);
  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form mt-6">
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <p>
        {action.value?.succes && (
          <code>Autenticado: Token: {action.value.jwt}</code>
        )}
      </p>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});
