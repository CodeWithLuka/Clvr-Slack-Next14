interface WorkspaceIdLayoutProps {
	children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
	return (
		<div className="h-full bg-blue-500">
			<div>{children}</div>
		</div>
	);
};

export default WorkspaceIdLayout;
