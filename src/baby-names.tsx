import { NamesDataInfo, namesData } from "./babyNamesData";

interface BabyNameProps {
  nameData: NamesDataInfo;
}

function BabyNameButton(props: BabyNameProps): JSX.Element {
  return (
    <>
      <button>{props.nameData.name}</button>
    </>
  );
}

function BabyNames(): JSX.Element {
  const namesArray = namesData.map((item, index) => (
    <BabyNameButton key={index} nameData={item} />
  ));
  return <>{namesArray}</>;
}

export { BabyNameButton, BabyNames };
