import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});
//const openai = new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async (
  pokemonName: string
): Promise<string> => {
  /* const response = await openai.createCompletion({
    model: "text-ada-001",
    prompt: `Dime algo turbio sobre el pokemon ${pokemonName}`,
    temperature: 1,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  }); */

  //console.log(response);
  return `Todo lo que podremos saber de ${pokemonName}`;
};
