interface ThreadBarProps {
	count?: number;
	image?: string;
	timestamp?: number;
	onClick?: () => void;
}

export const ThreadBar = ({
	count,
	image,
	timestamp,
	onClick,
}: ThreadBarProps) => {
	if (!count || !timestamp || !image) return null;

	return (
		<button
			onClick={onClick}
			className="p-1 rounded-md hover:bg-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition max-w-[600px]"
		>
			<div className="flex items-center gap-2 overflow-hidden">
				ThreadBar
			</div>
		</button>
	);
};
