import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { client, createCollection, hybridSearch, loadData } from "lib/helper";

export const dogRouter = createTRPCRouter({
  searchDogs: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const { text } = input;
      const response = await client.isReady();

      if (response) {
        const x = await loadData("dog");
        console.log(x, "this is x ");
        // const hybrid = await hybridSearch("dog", text);
        // console.log("hyrbrid", hybrid);
        // return hybrid;
      } else {
        console.warn(
          `Weaviate Instance is not connected. Please check credentials and try again.`,
        );
        return undefined;
      }
    }),
});
