import { Paper, styled, Typography } from "@mui/material";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type Tooltip = {
  tooltip: string | null;
  setTooltip: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TooltipContext = createContext<Tooltip>({
  tooltip: null,
  setTooltip: () => {},
});

export const useTooltipContext = () => useContext(TooltipContext);

export const TooltipProvider = ({ children }: PropsWithChildren) => {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <TooltipContext.Provider value={{ tooltip, setTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const Tooltip = () => {
  const { tooltip } = useTooltipContext();

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const callback = (ev: MouseEvent) => {
      setX(ev.clientX);
      setY(ev.clientY);
    };
    document.addEventListener("mousemove", callback);
    return () => {
      document.removeEventListener("mousemove", callback);
    };
  });

  if (tooltip === null) return null;

  return (
    <FloatingTooltip sx={{ top: `${y}px`, left: `${x}px` }}>
      <Typography noWrap>{tooltip}</Typography>
    </FloatingTooltip>
  );
};

const FloatingTooltip = styled(Paper)({
  position: "absolute",
  zIndex: 10,
  userSelect: "none",
  pointerEvents: "none",
  p: 1,
  transform: "translate(-0.5rem)",
});
