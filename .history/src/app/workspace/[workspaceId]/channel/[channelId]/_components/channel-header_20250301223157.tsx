interface ChannelHeaderProps {
	channelName: string;
}

export const ChannelHeader = ({ channelName }: ChannelHeaderProps) => {
	return (
		<div>
			<h1>ChannelHeader: {channelName}</h1>
		</div>
	);
};
