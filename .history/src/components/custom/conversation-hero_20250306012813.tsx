import { format } from "date-fns";

interface ConversationHeroProps {
	name: string;
	image: string;
}

export const ConversationHero = ({ name, image }: ConversationHeroProps) => {
	return (
		<div className="mt-[88px] mx-5 mb-4">
			<p className="text-2xl font-bold flex items-center mb-2">
				ConversationHero
			</p>
		</div>
	);
};
