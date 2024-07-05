import weaviate, { type WeaviateClient } from "weaviate-client";
import { vectorizer, generative } from "weaviate-client";
import { type DOG_BREEDS_API } from "./types";

export const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  String(process.env.WEAVIATE_INSTANCE_URL),
  {
    authCredentials: new weaviate.ApiKey(String(process.env.WEAVIATE_API_KEY)),
    headers: {
      "X-OpenAI-Api-Key": String(process.env.OPENAI_API_KEY),
    },
  },
);

export async function createCollection(collectionName: string) {
  const collection = await client.collections.create({
    name: collectionName,
    properties: [
      { name: "idOfBreed", dataType: "text" },
      { name: "type", dataType: "text" },
      {
        name: "attributes",
        dataType: "object",
        nestedProperties: [
          { dataType: "text", name: "name" },
          { dataType: "text", name: "description" },
          {
            name: "life",
            dataType: "object",
            nestedProperties: [
              { name: "max", dataType: "number" },
              { name: "min", dataType: "number" },
            ],
          },
          {
            name: "male_weight",
            dataType: "object",
            nestedProperties: [
              { name: "max", dataType: "number" },
              { name: "min", dataType: "number" },
            ],
          },
          {
            name: "female_weight",
            dataType: "object",
            nestedProperties: [
              { name: "max", dataType: "number" },
              { name: "min", dataType: "number" },
            ],
          },
          {
            name: "hypoallergenic",
            dataType: "boolean",
          },
        ],
      },
      {
        name: "relationships",
        dataType: "object",
        nestedProperties: [
          {
            name: "group",
            dataType: "object",
            nestedProperties: [
              {
                name: "data",
                dataType: "object",
                nestedProperties: [
                  { name: "idOfBreed", dataType: "text" },
                  { name: "type", dataType: "text" },
                ],
              },
            ],
          },
        ],
      },
    ],
    vectorizers: vectorizer.text2VecOpenAI(),
    generative: generative.openAI(),
  });

  return collection;
}

export async function checkIfCollectionExists(collectionName: string) {
  const collectionExists = await client.collections.exists(collectionName);
  if (collectionExists) {
    return client.collections.get(collectionName);
  } else {
    return await createCollection(collectionName);
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

export async function loadData(collectionName: string) {
  const collection = await checkIfCollectionExists(collectionName);
  let url = process.env.DOGS_API_URL;
  let nextPage = true;
  while (nextPage) {
    const data = await fetchData(String(url));
    await collection.data.insertMany(data.data);
    url = data.links.next ? String(data.links.next) : undefined;
    if (!url) {
      nextPage = false;
      break;
    }
  }

  for await (const item of collection.iterator()) {
    console.log(item, "this is item");
  }
  return `Data loaded.`;
}

export async function hybridSearch(collectionName: string, text: string) {
  const collection = await checkIfCollectionExists(collectionName);
  return await collection.query.hybrid(text, {
    limit: 2,
  });
}

// export async function semanticQuery(collectionName: string, text: string) {
//   const dog = client.collections.get(collectionName);
//   const result = await dog.query.nearText(text, {
//     limit: 5,
//   });

//   for (const object of result.objects) {
//     console.log(JSON.stringify(object.properties, null, 2));
//   }

//   return result;
// }

// export async function keywordQuery(collectionName: string, text: string) {
//   const collection = client.collections.get(collectionName);

//   const result = await collection.query.nearText(text, {
//     filters: client.collections
//       .get(collectionName)
//       .filter.byProperty("description")
//       .equal(text),
//     limit: 2,
//   });

//   for (const object of result.objects) {
//     console.log(JSON.stringify(object.properties, null, 2));
//   }
//   return result;
// }
