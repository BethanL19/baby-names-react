import { useState } from "react";
import { NamesDataInfo, namesData } from "./babyNamesData";

interface BabyNameButtonProps {
  nameData: NamesDataInfo;
  handleClickedFavs: (item: NamesDataInfo) => void;
}

function BabyNameButton(props: BabyNameButtonProps): JSX.Element {
  return (
    <>
      <button
        onClick={() => props.handleClickedFavs(props.nameData)}
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

  const [favNamesList, setFaveNamesList] = useState<NamesDataInfo[]>([]);
  const handleClickedFavs = (item: NamesDataInfo) => {
    if (!favNamesList.includes(item)) {
      setFaveNamesList([...favNamesList, item]);
    }
  };
  const handleUnFavourite = (item: NamesDataInfo) => {
    const index = favNamesList.indexOf(item);
    favNamesList.splice(index, 1);
    setFaveNamesList([...favNamesList]);
  };

  let filteredNamesData;
  if (typedSearch.length > 0) {
    filteredNamesData = namesData.filter(
      (item) =>
        item.name.toLowerCase().includes(typedSearch.toLowerCase()) &&
        !favNamesList.includes(item)
    );
  } else {
    filteredNamesData = namesData.filter(
      (item) => !favNamesList.includes(item)
    );
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
        {favNamesList.map((item, index) => (
          <button
            className={"nameButtons" + item.sex}
            key={index}
            onClick={() => handleUnFavourite(item)}
          >
            {item.name}
          </button>
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
