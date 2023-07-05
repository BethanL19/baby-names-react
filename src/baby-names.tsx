import { useState } from "react";
import { NamesDataInfo, namesData } from "./babyNamesData";

interface BabyNameButtonProps {
  nameData: NamesDataInfo;
}

function BabyNameButton(props: BabyNameButtonProps): JSX.Element {
  return (
    <>
      <button className={"nameButtons" + props.nameData.sex}>
        {props.nameData.name}
      </button>
    </>
  );
}

function BabyNames(): JSX.Element {
  const [typedSearch, setTypedSearch] = useState("");
  const handleSearch = (searchWord: string) => setTypedSearch(searchWord);

  let filteredNamesData;
  if (typedSearch.length > 0) {
    filteredNamesData = namesData.filter((item) =>
      item.name.toLowerCase().includes(typedSearch.toLowerCase())
    );
  } else {
    filteredNamesData = namesData;
  }

  const sortedNamesData = [...filteredNamesData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const namesArray = sortedNamesData.map((item, index) => (
    <BabyNameButton key={index} nameData={item} />
  ));

  return (
    <div>
      <input
        className="searchBar"
        placeholder="Search..."
        value={typedSearch}
        onChange={(event) => handleSearch(event.target.value)}
      />
      {namesArray}
    </div>
  );
}

export { BabyNameButton, BabyNames };
