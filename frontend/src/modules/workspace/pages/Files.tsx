import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";

export const Files = () => {
  const { project } = useWorkspaceContext();

  return (
    <div>
      <div>files</div>
      <div>{project.id}</div>
      <div>{project.name}</div>
    </div>
  );
};
