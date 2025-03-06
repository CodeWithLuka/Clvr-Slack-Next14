import { format } from "date-fns";

interface ChannelHeroProps {
	name: string;
	creationTime: number;
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
	return (
		<div>
			<h1>ChannelHero</h1>
		</div>
	);
};
