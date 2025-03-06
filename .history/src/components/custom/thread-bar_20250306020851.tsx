interface ThreadBarProps {
	count?: number;
	image?: string;
	timestamp?: number;
}

export const ThreadBar = ({ count, image, timestamp }: ThreadBarProps) => {
	return (
		<div>
			<h1>ThreadBar</h1>
		</div>
	);
};
