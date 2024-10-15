import { useWorkspaceContext } from "../components/WorkspaceContext/WorkspaceContext";

export const Settings = () => {
  const { project } = useWorkspaceContext();

  return (
    <div>
      <div>settings</div>
      <div>{project.id}</div>
      <div>{project.name}</div>
    </div>
  );
};
