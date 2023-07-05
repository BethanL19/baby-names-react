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

interface BabyNamesProps {
  typedSearchState: string;
}

function BabyNames(props: BabyNamesProps): JSX.Element {
  const sortedNamesData = [...namesData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (props.typedSearchState.length > 0) {
    namesData.filter((who) => who.name.match(props.typedSearchState));
  }

  const namesArray = sortedNamesData.map((item, index) => (
    <BabyNameButton key={index} nameData={item} />
  ));
  return <div>{namesArray}</div>;
}

export { BabyNameButton, BabyNames };

// centre buttons
