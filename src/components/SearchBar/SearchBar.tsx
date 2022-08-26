import { Box, InputAdornment } from "@mui/material";
import {
  BorderLessTextInput,
  CenterAlignedStack,
} from "../../theme/styledComponents";
import { useAppSelector } from "../../app/hooks";
import { selectSearchTerm } from "../SearchBar/searchSlice";

//Icons
import SearchIcon from "@mui/icons-material/Search";

//Types
export type SearchBarProps = {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
};
function SearchBar({ onChangeHandler }: SearchBarProps) {
  const searchTerm = useAppSelector((store) => selectSearchTerm(store));
  return (
    <Box>
      <CenterAlignedStack direction="row" sx={{ padding: "10px" }}>
        <BorderLessTextInput
          fullWidth
          variant="outlined"
          placeholder="Search Teachers"
          onChange={onChangeHandler}
          value={searchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="large" />
              </InputAdornment>
            ),
          }}
        />
      </CenterAlignedStack>
    </Box>
  );
}

export default SearchBar;
