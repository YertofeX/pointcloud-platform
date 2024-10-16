import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { usePointCloudsContext } from "../contexts/PointCloudsContext";

export const PotreeScene = () => {
  const { pointClouds, pointCloudsRef, potree, loadPco, unloadPcos } =
    usePointCloudsContext();

  useEffect(() => {
    loadPco(
      "https://raw.githubusercontent.com/potree/potree/develop/pointclouds/lion_takanawa/",
      "cloud.js",
      "lion"
    );

    loadPco(
      "https://static.thelostmetropolis.org/BigShotCleanV2/",
      "metadata.json",
      "facility"
    );

    // loadPco("/pointclouds/output/banya/", "metadata.json", "bánya");
    // loadPco("/pointclouds/output/teszt/", "metadata.json", "Teszt");

    // loadPco("/pointclouds/output/line/", "metadata.json");
    // loadPco("/pointclouds/output/lattice/", "metadata.json");

    // loadPco(
    //   "https://mandras.pannon2010.hu/uploads/projects/1/potrees/17jh2t8aja2v4fvxih21shac/",
    //   "metadata.json"
    // );

    return () => {
      unloadPcos();
    };
  }, []);

  const pcos = useMemo(
    () => pointClouds.filter(({ visible }) => visible).map(({ pco }) => pco),
    [pointClouds]
  );

  useFrame(({ camera, gl }) => {
    potree.updatePointClouds(pcos, camera, gl);
  });

  return (
    <group ref={pointCloudsRef}>
      {pcos.map((pco) => (
        <primitive key={pco.id} object={pco} />
      ))}
    </group>
  );
};
