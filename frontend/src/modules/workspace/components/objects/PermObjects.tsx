import { PermLineComponent } from "./permLine/PermLineComponent";
import { PermAreaComponent } from "./permArea/PermAreaComponent";
import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";

export const PermObjects = () => {
  const { permLines, permAreas } = usePermObjectContext();

  return (
    <>
      {permLines.map((line) => (
        <PermLineComponent line={line} key={line.id} />
      ))}
      {permAreas.map((area) => (
        <PermAreaComponent area={area} key={area.id} />
      ))}
    </>
  );
};
