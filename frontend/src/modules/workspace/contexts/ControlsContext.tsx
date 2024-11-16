import { createContext, useContext, useState } from "react";

type ControlsContextType = {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  /** `true` if a camera movement is currently in progress */
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ControlsContext = createContext<ControlsContextType>({
  enabled: false,
  setEnabled: () => {},
  moving: false,
  setMoving: () => {},
});

export const useControlsContext = () => useContext(ControlsContext);

export const ControlsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [moving, setMoving] = useState<boolean>(false);

  return (
    <ControlsContext.Provider
      value={{ enabled, setEnabled, moving, setMoving }}
    >
      {children}
    </ControlsContext.Provider>
  );
};
