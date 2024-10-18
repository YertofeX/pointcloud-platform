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
  useRef,
  useState,
} from "react";
import { Group } from "three";

// Pointcloud octree with extra properties
// extending the PointCloudOctree class with an extra 'isVisible' field didn't work
export type PointCloud = {
  pco: PointCloudOctree;
  visible: boolean;
};

export type PointCloudsContextProps = {
  pointCloudsRef: React.RefObject<Group>;
  pointClouds: PointCloud[];
  visiblePcos: PointCloudOctree[];
  setPointClouds: React.Dispatch<React.SetStateAction<PointCloud[]>>;
  potree: Potree;
  loadPco: (baseUrl: string, filename: string, name?: string) => void;
  unloadPcos: () => void;
};

export const PointCloudsContext = createContext<PointCloudsContextProps>({
  pointCloudsRef: { current: null },
  pointClouds: [],
  visiblePcos: [],
  setPointClouds: () => {},
  potree: new Potree(),
  loadPco: () => {},
  unloadPcos: () => {},
});

export const usePointCloudsContext = () => useContext(PointCloudsContext);

export const PointCloudsProvider = ({ children }: PropsWithChildren) => {
  const potree = new Potree();

  const pointCloudsRef = useRef<Group>(null);

  const [pointClouds, setPointClouds] = useState<PointCloud[]>([]);

  const loadPco = (baseUrl: string, filename: string, name?: string) => {
    potree
      .loadPointCloud(filename, (url: string) => `${baseUrl}${url}`)
      .then(function (pco: PointCloudOctree) {
        if (!pointCloudsRef.current) return;

        pco.material.size = PointSizeType.ADAPTIVE;
        pco.material.shape = PointShape.PARABOLOID;
        pco.material.inputColorEncoding = 1;
        pco.material.outputColorEncoding = 1;
        pco.showBoundingBox = false;
        // pco.pointSizeType = PointSizeType.FIXED;
        pco.name = name ?? `pointcloud ${pointClouds.length}`;

        setPointClouds((pointClouds) => [
          ...pointClouds,
          { pco: pco, visible: true },
        ]);

        // console.log("Cloud loaded", pco);

        // * bounding box for debugging * //
        // const box = pco.pcoGeometry.boundingBox;
        // const size = box.getSize(new Vector3());
        // const geometry = new BoxGeometry(size.x, size.y, size.z);
        // const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        // const mesh = new Mesh(geometry, material);
        // mesh.position.copy(pco.position);
        // mesh.scale.copy(pco.scale);
        // mesh.rotation.copy(pco.rotation);
        // mesh.raycast = () => false;
        // mesh.position.add(new Vector3(size.x / 2, size.y / 2, size.z / 2));
        // pointCloudsRef.current.add(mesh);
      });
  };

  const unloadPcos = () => {
    pointClouds.forEach((extPco) => {
      extPco.pco.dispose();
    });
    setPointClouds([]);
  };

  return (
    <PointCloudsContext.Provider
      value={{
        pointCloudsRef,
        pointClouds,
        visiblePcos: pointClouds
          .filter(({ visible }) => visible)
          .map(({ pco }) => pco),
        setPointClouds,
        potree,
        loadPco,
        unloadPcos,
      }}
    >
      {children}
    </PointCloudsContext.Provider>
  );
};
