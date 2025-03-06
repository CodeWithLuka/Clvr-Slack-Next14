import { Card, CardHeader } from "@/components/ui/card";

export const SignInCard = () => {
	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<span className="text-3xl">Welcome Back! 🚀</span>
				<br className="mt-2" /> Log in to continue
			</CardHeader>
		</Card>
	);
};
