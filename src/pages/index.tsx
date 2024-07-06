import { Box } from "@mui/material";
import Layout from "~/components/Layout/Layout";
import Search from "~/components/SearchInput/Search";

export default function Home() {
  return (
    <Layout>
      <Box className="flex flex-col items-center space-y-8 rounded-xl bg-gradient-to-r from-blue-200 to-blue-300 p-8 shadow-lg">
        <Box className="text-center text-3xl font-bold text-blue-900">
          DogFinder
        </Box>
        <Box className="max-w-md text-center text-lg text-blue-800">
          Do you love dogs? Enter keywords to find details about your favorite
          dog! Using Weaviate and OpenAI, the most relevant results will be
          populated. We have used a combination of the Weaviate hybrid.
        </Box>
        <Search />
      </Box>
    </Layout>
  );
}
