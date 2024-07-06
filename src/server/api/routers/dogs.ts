import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { keywordSearch, loadData } from "lib/helper";
import { type formattedAPIDogData } from "lib/types";

export const dogRouter = createTRPCRouter({
  searchDogs: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const { text } = input;
      try {
        await loadData("Dog");
        const result = await keywordSearch("Dog", text);
        return result as {
          data: { Get: { Dog: (typeof formattedAPIDogData)[] } };
        };
      } catch (e) {
        throw Error(JSON.stringify(e));
      }
    }),
});
