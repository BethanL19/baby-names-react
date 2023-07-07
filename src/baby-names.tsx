import { useState } from "react";
import { NamesDataInfo, namesData } from "./babyNamesData";

interface BabyNameButtonProps {
  nameData: NamesDataInfo;
  handleClickedFavs: (name: string) => void;
}

function BabyNameButton(props: BabyNameButtonProps): JSX.Element {
  return (
    <>
      <button
        onClick={() => props.handleClickedFavs(props.nameData.name)}
        className={"nameButtons" + props.nameData.sex}
      >
        {props.nameData.name}
      </button>
    </>
  );
}

function BabyNames(): JSX.Element {
  const [typedSearch, setTypedSearch] = useState("");
  const handleSearch = (searchWord: string) => setTypedSearch(searchWord);

  const [favName, setFavName] = useState<string>("");
  const [favNamesList, setFaveNamesList] = useState<string[]>([]);
  const handleClickedFavs = (name: string) => {
    setFaveNamesList([...favNamesList, favName]);
    setFavName(name);
  };

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
    <BabyNameButton
      key={index}
      nameData={item}
      handleClickedFavs={handleClickedFavs}
    />
  ));

  return (
    <div>
      <input
        className="searchBar"
        placeholder="Search..."
        value={typedSearch}
        onChange={(event) => handleSearch(event.target.value)}
      />
      <h3 className="favs">
        Favourites:{" "}
        {favNamesList.slice(1).map((n, index) => (
          <button key={index}>{n}</button>
        ))}
      </h3>
      {namesArray}
    </div>
  );
}

export { BabyNameButton, BabyNames };

// gender formating needed on favs
// add as soon as name clicked?
// remove from main buttons (will stops dupes)