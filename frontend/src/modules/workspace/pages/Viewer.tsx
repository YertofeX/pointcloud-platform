import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";

export const Viewer = () => {
  const { project } = useWorkspaceContext();
  return (
    <div>
      <div>viewer</div>
      <div>{project.id}</div>
      <div>{project.name}</div>
    </div>
  );
};
