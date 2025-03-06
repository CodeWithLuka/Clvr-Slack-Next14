import { SignInFlow } from "../types";

interface SignUpCardProps {
	setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
	return (
		<div>
			<h1>SignUpCard</h1>
		</div>
	);
};
