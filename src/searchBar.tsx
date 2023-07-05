interface SearchBarProps {
  typedSearchState: string;
  // setTypedSearchState: string;
}
export function SearchBar(props: SearchBarProps): JSX.Element {
  // const handleSearch = (searchWord: string) => props.setTypedSearchState(searchWord)

  return (
    <>
      <input
        className="searchBar"
        placeholder="Search..."
        value={props.typedSearchState}
        // onChange={(event) => handleSearch(event.target.value)}
      />
    </>
  );
}
