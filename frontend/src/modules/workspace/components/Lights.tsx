export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[2, 2, 2]} intensity={10} />
    </>
  );
};
