import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default openai;
