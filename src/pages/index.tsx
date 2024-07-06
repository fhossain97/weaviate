import { Box } from "@mui/material";
import Layout from "~/components/Layout/Layout";
import Search from "~/components/SearchInput/Search";

export default function Home() {
  return (
    <Layout>
      <Box className="flex flex-col items-center space-y-4">
        <Box className="mb-4 text-left">DogFinder</Box>
        <Box className="mb-4 text-left">
          Do you love dogs? Enter keywords to find details about your favorite
          dog! Using Weaviate and OpenAI, the most relevant results will be
          populated. We have used a combination of the Weaviate hybrid.
        </Box>
        <Search />
      </Box>
    </Layout>
  );
}
