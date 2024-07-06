import { Box, Button, TextField } from "@mui/material";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import Results from "../ResultsTable/Table";

const Search = () => {
  const [inquiry, setInquiry] = useState<string>("");

  const search = api.dogs.searchDogs.useMutation();

  const handleQuery = (e: FormEvent) => {
    e.preventDefault();

    search.mutate({ text: inquiry });
    if (!search) {
      <Box> Loading Data... </Box>;
    }
  };

  return (
    <Box className="mb-10 flex w-full flex-col items-center">
      <form onSubmit={handleQuery} className="flex w-full items-center">
        <TextField
          id="standard-basic"
          label="Type in name of dog breed here."
          variant="standard"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          className="flex-grow"
        />
        <Button variant="contained" type="submit" className="ml-2">
          Search
        </Button>
      </form>
      <Box className={`mt-4`}>
        {" "}
        {search?.data?.data ? (
          <Results data={search.data?.data.Get.Dog} />
        ) : undefined}
      </Box>
    </Box>
  );
};

export default Search;
