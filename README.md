# DogFinder

DogFinder is an application inspired by [QuoteFinder](https://quotefinder.weaviate.io/), allowing users to search for information on their favorite dog breeds using keywords.

## Notes on Search

To search for dog breeds, please use the following keywords:

- Border
- Collie
- German

## Installation / Run Application

To install dependencies, run:

`npm install`

To run application:

`npm run dev`

## Loom Demo Vido

Please note that the recording for the app via the application was causing issues. I recorded the video on [Loom](https://www.loom.com/share/1d70381054a8450f8ccf29c80d6a1381?sid=47be35b2-9c9c-4edd-bc1c-d0d00183378b).

## Environment Variables

This repository requires the following environment variables to be set in a `.env` file:

- WEAVIATE_INSTANCE_URL="https://farhana-sandbox-7lpuhim1.weaviate.network"
- WEAVIATE_API_KEY="jbHF7aOH6vSOff08IxENCzdgIAp9Cxa1MZum"
- OPENAI_API_KEY="sk-proj-5aEfK9yFIf43WJ03HB1QT3BlbkFJBrUYCVNYDv0hn6hkCaF9"
- DOGS_API_URL="https://dogapi.dog/api/v2/breeds"

Note: These are test credentials. Replace them with actual credentials for production use.

## Additional Findings

1. **Hybrid Search Issues**: Initially, a hybrid search similar to QuoteFinder was implemented, but it resulted in `ClientError` despite specifying the vectorizer in the schema. For more details, refer to [this support link](https://forum.weaviate.io/t/hybrid-search-giving-errors-about-missing-vectorizer-but-objects-are-vectorized-correctly/20922).

2. **Duplicate Object Retrieval**: After a user searches using keywords, duplicate objects are sometimes returned. This issue has been noted by the Weaviate community and is under investigation.
