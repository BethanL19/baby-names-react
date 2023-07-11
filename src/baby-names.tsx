import { useState } from "react";
import { NamesDataInfo, namesData } from "./babyNamesData";

interface BabyNameButtonProps {
  nameData: NamesDataInfo;
  handleClickedFavs: (item: NamesDataInfo) => void;
}

type Gender = "girl" | "boy" | "all";

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

  const [girlButtonActive, setGirlButtonActive] = useState({
    borderBottom: "4px solid white",
  });
  const [boyButtonActive, setBoyButtonActive] = useState({
    borderBottom: "4px solid white",
  });
  const [allButtonActive, setAllButtonActive] = useState({
    borderBottom: "4px solid black",
  });
  const [genderFilter, setGenderFilter] = useState<Gender>("all");
  const handleGirlClicked = () => {
    setGenderFilter("girl");
    setGirlButtonActive({ borderBottom: "4px solid black" });
    setBoyButtonActive({ borderBottom: "4px solid white" });
    setAllButtonActive({ borderBottom: "4px solid white" });
  };
  const handleBoyClicked = () => {
    setGenderFilter("boy");
    setBoyButtonActive({ borderBottom: "4px solid black" });
    setGirlButtonActive({ borderBottom: "4px solid white" });
    setAllButtonActive({ borderBottom: "4px solid white" });
  };
  const handleAllClicked = () => {
    setGenderFilter("all");
    setAllButtonActive({ borderBottom: "4px solid black" });
    setBoyButtonActive({ borderBottom: "4px solid white" });
    setGirlButtonActive({ borderBottom: "4px solid white" });
  };
  const genderFilterOutcome = (item: NamesDataInfo) => {
    if (genderFilter === "girl") {
      return item.sex === "f";
    } else if (genderFilter === "boy") {
      return item.sex === "m";
    } else {
      return true;
    }
  };

  const filteredFavsList = favNamesList.filter((item) =>
    genderFilterOutcome(item)
  );

  let filteredNamesData;
  if (typedSearch.length > 0) {
    filteredNamesData = namesData.filter(
      (item) =>
        item.name.toLowerCase().includes(typedSearch.toLowerCase()) &&
        !favNamesList.includes(item) &&
        genderFilterOutcome(item)
    );
  } else {
    filteredNamesData = namesData.filter(
      (item) => !favNamesList.includes(item) && genderFilterOutcome(item)
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
      <div className="filterButtons">
        <button
          className="girl"
          onClick={handleGirlClicked}
          style={girlButtonActive}
        >
          🐣
        </button>
        <button
          className="boy"
          onClick={handleBoyClicked}
          style={boyButtonActive}
        >
          🐣
        </button>
        <button
          className="all"
          onClick={handleAllClicked}
          style={allButtonActive}
        >
          🐣
        </button>
      </div>
      <h3 className="favs">
        Favourites:{" "}
        {filteredFavsList.map((item, index) => (
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
