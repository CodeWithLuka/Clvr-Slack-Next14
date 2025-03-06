interface WorkspaceSectionProps {
	label: string;
	hint: string;
	onNew?: () => void;
	children: React.ReactNode;
}

export const WorkspaceSection = ({
	label,
	hint,
	onNew,
	children,
}: WorkspaceSectionProps) => {
	return (
		<div>
			<div>{children}</div>
		</div>
	);
};
