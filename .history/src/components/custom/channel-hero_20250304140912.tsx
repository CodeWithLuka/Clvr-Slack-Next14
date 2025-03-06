import { format } from "date-fns";

interface ChannelHeroProps {
	name: string;
	creationTime: number;
}

export const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
	return (
		<div className="mt-[88px] mx-5 mb-4">
			<div className="text-2xl font-bold flex items-center mb-2">
				# {name}
			</div>
		</div>
	);
};
