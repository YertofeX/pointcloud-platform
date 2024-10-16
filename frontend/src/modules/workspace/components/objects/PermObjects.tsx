import { usePermObjectContext } from "@modules/workspace/contexts/PermObjectContext";
import { PermLineComponent } from "./permLine/PermLineComponent";
import { PermAreaComponent } from "./permArea/PermAreaComponent";

export const PermObjects = () => {
  const { permLines, permAreas } = usePermObjectContext();

  return (
    <>
      {permLines.map((line, index) => (
        <PermLineComponent line={line} key={index} />
      ))}
      {permAreas.map((area, index) => (
        <PermAreaComponent area={area} key={index} />
      ))}
    </>
  );
};
