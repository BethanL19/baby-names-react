import { useState } from "react";
import { BabyNames } from "./baby-names";
import { SearchBar } from "./searchBar";
import "./style.css";

function App(): JSX.Element {
  const [typedSearch, setTypedSearch] = useState("A");
  return (
    <>
      <SearchBar typedSearchState={typedSearch} />
      <BabyNames typedSearchState={typedSearch} />
    </>
  );
}

export default App;
