import OpenAI from "openai";
import { prompt } from "./helpers"
import { OPENAI_API_KEY } from "../../global";
import { ParserService } from ".";

export const ParserServiceFactory = () => {

  return new ParserService(
    new OpenAI({
      apiKey: OPENAI_API_KEY,
    }),
    prompt,
  );
};