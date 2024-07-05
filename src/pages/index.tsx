import { Box } from "@mui/material";
import Layout from "~/components/Layout/Layout";
import Search from "~/components/SearchInput/Search";

export default function Home() {
  return (
    <Layout>
      <Box className="flex flex-col">
        <Box className="mb-4 text-left">DogFinder</Box>
        <Box className="text-left">
          Do you love dogs? We have used a combination of the Weaviate hybrid
          search (semantic + keyword searches) coupled with OpenAI to find your
          dream dog! The semantic searches allow you to search on the meaning of
          a text (general), while keyword searches look for exact matches
          (specific). Below, add in some text to get started!
        </Box>
        <Search />
      </Box>
    </Layout>
  );
}
