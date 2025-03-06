interface WorkspaceIdLayoutProps {
	children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
	return (
		<div className="h-full">
			<div>{children}</div>
		</div>
	);
};

export default WorkspaceIdLayout;
