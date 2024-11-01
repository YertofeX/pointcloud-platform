import {
  PointCloudOctree,
  PointShape,
  PointSizeType,
  Potree,
} from "potree-core";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PointCloudData } from "@api/types";
import { pocketBase } from "@lib/pocketbase";
import { useGetPointClouds } from "@api/hooks";
import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";
import { Group } from "three";

export type PointCloud = PointCloudData & { pco: PointCloudOctree };

export type PointCloudsContextType = {
  potree: Potree;
  pointCloudsRef: React.RefObject<Group>;
  pointClouds: PointCloud[];
  visiblePcos: PointCloudOctree[];
};

export const PointCloudsContext = createContext<PointCloudsContextType>({
  potree: new Potree(),
  pointCloudsRef: { current: null },
  pointClouds: [],
  visiblePcos: [],
});

export const usePointCloudsContext = () => useContext(PointCloudsContext);

const potree = new Potree();

export const PointCloudsProvider = ({ children }: PropsWithChildren) => {
  const pointCloudsRef = useRef<Group>(null);

  const {
    project: { id: projectID },
  } = useWorkspaceContext();

  const { data: pointCloudDatas } = useGetPointClouds({ projectID });
  const [pointClouds, setPointClouds] = useState<PointCloud[]>([]);

  useEffect(() => {
    if (!pointCloudDatas)
      return () => {
        setPointClouds([]);
      };

    const loadPco = async (pointCloud: PointCloudData) => {
      const pco = await potree.loadPointCloud(
        "metadata.json",
        (url: string) =>
          `${pocketBase.getFileUrl(pointCloud, pointCloud.metadata).split("metadata.json")[0]}${url}`
      );
      pco.material.size = PointSizeType.ADAPTIVE;
      pco.material.shape = PointShape.PARABOLOID;
      pco.material.inputColorEncoding = 1;
      pco.material.outputColorEncoding = 1;
      pco.showBoundingBox = false;
      // pco.pointSizeType = PointSizeType.FIXED;
      pco.name = pointCloud.name;
      return pco;
    };

    const loadPointClouds = async (pointClouds: PointCloudData[]) => {
      pointClouds.forEach(async (pointCloud) => {
        const pco = await loadPco(pointCloud);
        setPointClouds((prev) => [...prev, { ...pointCloud, pco }]);
      });
    };

    loadPointClouds(pointCloudDatas);

    return () => {
      pointClouds.forEach(({ pco }) => pco.dispose());
      setPointClouds([]);
    };
  }, [pointCloudDatas]);

  const visiblePcos = useMemo<PointCloudOctree[]>(
    () => pointClouds.filter(({ visible }) => visible).map(({ pco }) => pco),
    [pointClouds]
  );

  return (
    <PointCloudsContext.Provider
      value={{
        potree,
        pointCloudsRef,
        pointClouds,
        visiblePcos,
      }}
    >
      {children}
    </PointCloudsContext.Provider>
  );
};
