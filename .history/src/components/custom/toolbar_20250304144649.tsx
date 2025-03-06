interface ToolbarProps {
	isAuthor: boolean;
	isPending: boolean;
	handleEdit: () => void;
	handleThread: () => void;
	handleDelete: () => void;
}

export const Toolbar = ({
	isAuthor,
	isPending,
	handleEdit,
	handleThread,
	handleDelete,
}: ToolbarProps) => {
	return (
		<div>
			<h1>Toolbar</h1>
		</div>
	);
};
