interface ChannelHeaderProps {
	title: string;
}

export const ChannelHeader = ({ title }: ChannelHeaderProps) => {
	return (
		<div>
			<h1>ChannelHeader: {title}</h1>
		</div>
	);
};
