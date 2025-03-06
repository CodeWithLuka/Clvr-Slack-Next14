import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export const SignInCard = () => {
	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">Sign-In To Continue</CardHeader>
			<CardDescription>
				Use your email or another service to continue
			</CardDescription>
		</Card>
	);
};
