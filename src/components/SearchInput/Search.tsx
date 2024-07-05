import { Box, Button, TextField } from "@mui/material";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

const Search = () => {
  const [inquiry, setInquiry] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data: searchResults, isLoading: loading } =
      api.dogs.searchDogs.useQuery({
        text: inquiry,
      });
    return loading ? undefined : searchResults;
  };

  return (
    <Box className="flex w-full flex-row items-center">
      <form onSubmit={handleSubmit} className="flex w-full items-center">
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
    </Box>
  );
};

export default Search;
