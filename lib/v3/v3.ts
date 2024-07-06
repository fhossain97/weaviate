// import weaviate, { Filters, type WeaviateClient } from "weaviate-client";
// import { vectorizer, generative } from "weaviate-client";
// import { type DOG_BREEDS_API } from "./types";

// export const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
//   String(process.env.WEAVIATE_INSTANCE_URL),
//   {
//     authCredentials: new weaviate.ApiKey(String(process.env.WEAVIATE_API_KEY)),
//     headers: {
//       "X-OpenAI-Api-Key": String(process.env.OPENAI_API_KEY),
//     },
//   },
// );

// export async function createCollection(collectionName: string) {
//   const classObj = {
//     class: collectionName,
//     vectorizer: "text2vec-openai",
//     moduleConfig: {
//       "text2vec-openai": {},
//     },
//   };
//   const res = await client.schema.classCreator().withClass(classObj).do();
//   console.log(res);
// }

// export async function fetchData(url: string) {
//   return (await fetch(String(url), {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//     },
//   }).then((res) => res.json())) as typeof DOG_BREEDS_API;
// }

// export async function formatData() {
//   let url = process.env.DOGS_API_URL;
//   const data: (typeof DOG_BREEDS_API)[] = [];
//   let nextPage = true;
//   while (nextPage) {
//     const api = await fetchData(String(url));
//     console.log(`Fetching data from API ...`);
//     //Please note that this API contains 29 pages at this endpoint and this will take roughly 30 secs
//     data.push(api);
//     url = api.links.next ? String(api.links.next) : undefined;
//     if (!api.links.next) {
//       console.log(`Data loaded, exiting out of loop...`);
//       nextPage = false;
//     }
//   }

//   return data
//     .map((d) => {
//       return d.data.map((doc) => {
//         return {
//           name: doc.attributes.name,
//           description: doc.attributes.description,
//           life_span: {
//             max: doc.attributes.life.max,
//             min: doc.attributes.life.min,
//           },
//           male_weight: {
//             max: doc.attributes.male_weight.max,
//             min: doc.attributes.male_weight.min,
//           },
//           female_weight: {
//             max: doc.attributes.female_weight.max,
//             min: doc.attributes.female_weight.min,
//           },
//           hypoallergenic: doc.attributes.hypoallergenic,
//         };
//       });
//     })
//     .flat();
// }

// export async function checkIfCollectionExists(collectionName: string) {
//   const collectionExists = await client.collections.exists(collectionName);
//   if (collectionExists) {
//     return client.collections.get(collectionName);
//   } else {
//     const newCollection = await createCollection(collectionName);
//     const formattedData = await formatData();
//     const x = await newCollection.data.insertMany(formattedData);
//     console.log(x, "data inserted");
//     return newCollection;
//   }
// }

// export async function hybridSearch(collectionName: string, text: string) {
//   const collection = await checkIfCollectionExists(collectionName);
//   return await collection.query.hybrid(text, {
//     filters: Filters.and(
//       collection.filter.byProperty("name").containsAny([text]),
//       collection.filter.byProperty("description").containsAny([text]),
//     ),
//     limit: 5,
//   });
// }

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
