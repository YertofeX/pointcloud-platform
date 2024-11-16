import { useLocalization } from "@components/LocalizationManager";
import { Typography } from "@mui/material";
import { PointCloudOctree } from "potree-core";
import { useEffect, useState } from "react";

type Props = {
  pco: PointCloudOctree;
};

export const PointCloudPointCount = ({ pco }: Props) => {
  const { numberFormatter } = useLocalization();

  const [pointCount, setPointCount] = useState<number>(pco.numVisiblePoints);

  useEffect(() => {
    let animationFrameId: number;

    const checkVisiblePoints = () => {
      setPointCount(pco.numVisiblePoints);
      animationFrameId = requestAnimationFrame(checkVisiblePoints);
    };

    checkVisiblePoints();

    return () => cancelAnimationFrame(animationFrameId);
  }, [pco]);

  return (
    <Typography color="primary">
      {numberFormatter.format(pointCount)}
    </Typography>
  );
};
