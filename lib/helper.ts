import weaviate, {
  type WeaviateClient,
  type ObjectsBatcher,
  ApiKey,
} from "weaviate-ts-client";
import { type DOG_BREEDS_API } from "./types";

export const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: String(process.env.WEAVIATE_INSTANCE_URL),
  apiKey: new ApiKey(String(process.env.WEAVIATE_API_KEY)),
  headers: {
    "X-OpenAI-Api-Key": String(process.env.OPENAI_API_KEY),
  },
});

export async function createCollection(collectionName: string) {
  const classObj = {
    class: collectionName,
    properties: [
      {
        dataType: ["text"],
        name: "name",
        indexFilterable: true,
        indexSearchable: true,
      },
      {
        dataType: ["text"],
        name: "description",
        indexFilterable: true,
        indexSearchable: true,
      },
      {
        name: "life_span",
        dataType: "object",
        nestedProperties: [
          { name: "max", dataType: ["int"] },
          { name: "min", dataType: ["int"] },
        ],
      },
      {
        name: "male_weight",
        dataType: "object",
        nestedProperties: [
          { name: "max", dataType: ["int"] },
          { name: "min", dataType: ["int"] },
        ],
      },
      {
        name: "female_weight",
        dataType: "object",
        nestedProperties: [
          { name: "max", dataType: ["int"] },
          { name: "min", dataType: ["int"] },
        ],
      },
      {
        name: "hypoallergenic",
        dataType: ["boolean"],
      },
    ],
    vectorizer: "text2vec-openai",
    moduleConfig: {
      "text2vec-openai": { model: "text-embedding-3-large" },
    },
  };
  await client.schema.classCreator().withClass(classObj).do();

  return;
}

export async function checkIfCollectionExists(collectionName: string) {
  const collectionExists = await client.schema.exists(collectionName);
  if (!collectionExists) {
    await createCollection(collectionName);
    return collectionName;
  } else {
    return collectionName;
  }
}

export async function fetchData(url: string) {
  return (await fetch(String(url), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((res) => res.json())) as typeof DOG_BREEDS_API;
}

export async function formatData() {
  const url = process.env.DOGS_API_URL;
  const data: (typeof DOG_BREEDS_API)[] = [];
  const api = await fetchData(String(url));
  data.push(api);
  // let nextPage = true;

  //The API has 29 pages, for this project, I'm only making a call to the first page
  // while (nextPage) {
  //   const api = await fetchData(String(url));
  //   console.log(`Fetching data from API ...`);
  //   data.push(api);
  //   url = api.links.next ? String(api.links.next) : undefined;
  //   if (!api.links.next) {
  //     console.log(`Data loaded, exiting out of loop...`);
  //     nextPage = false;
  //   }
  // }

  return data
    .map((d) => {
      return d.data.map((doc) => {
        return {
          name: doc.attributes.name,
          description: doc.attributes.description,
          life_span: {
            max: doc.attributes.life.max,
            min: doc.attributes.life.min,
          },
          male_weight: {
            max: doc.attributes.male_weight.max,
            min: doc.attributes.male_weight.min,
          },
          female_weight: {
            max: doc.attributes.female_weight.max,
            min: doc.attributes.female_weight.min,
          },
          hypoallergenic: doc.attributes.hypoallergenic,
        };
      });
    })
    .flat();
}

export async function loadData(collectionName: string) {
  const schemaName = await checkIfCollectionExists(collectionName);
  const formattedData = await formatData();

  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let counter = 0;
  const batchSize = 100;

  for (const doc of formattedData) {
    const obj = {
      class: schemaName,
      properties: {
        name: doc.name,
        description: doc.description,
        life_span: {
          max: doc.life_span.max,
          min: doc.life_span.min,
        },
        male_weight: {
          max: doc.male_weight.max,
          min: doc.male_weight.min,
        },
        female_weight: {
          max: doc.female_weight.max,
          min: doc.female_weight.min,
        },
        hypoallergenic: doc.hypoallergenic,
      },
    };
    batcher = batcher.withObject(obj);
    if (counter++ == batchSize) {
      await batcher.do();
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }
  await batcher.do();
}

export async function keywordSearch(collectionName: string, text: string) {
  return await client.graphql
    .get()
    .withClassName(collectionName)
    .withBm25({
      query: text,
    })
    .withLimit(5)
    .withFields("name description hypoallergenic")
    .do();
}
