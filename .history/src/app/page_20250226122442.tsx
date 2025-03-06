import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const HomePage = () => {
	const { signOut } = useAuthActions();

	return (
		<div className="items-center justify-center space-y-2.5 p-10">
			<h1>Hello Emmanuel</h1>
			<Button onClick={() => signOut()}>Sign-Out</Button>
		</div>
	);
};

export default HomePage;
