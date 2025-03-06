interface ConversationHeroProps {
	name?: string;
	image?: string;
}

export const ConversationHero = ({ name, image }: ConversationHeroProps) => {
	return (
		<div>
			<h1>ConversationHero</h1>
		</div>
	);
};
