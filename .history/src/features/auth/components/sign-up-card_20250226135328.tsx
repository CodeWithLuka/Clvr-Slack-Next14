import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { SignInFlow } from "../types";

interface SignUpCardProps {
	setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
	const { signIn } = useAuthActions();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [pending, setPending] = useState<boolean>(false);

	const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match!");
			return;
		}

		setPending(true);
		signIn("password", { email, password, flow: "signUp" })
			.catch(() => {
				setError("Something Went Wrong");
			})
			.finally(() => {
				setPending(false);
			});
	};

	const onProviderSignUp = (value: "github" | "google") => {
		setPending(true);
		signIn(value).finally(() => {
			setPending(false);
		});
	};

	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Welcome To Clvr</CardTitle>
				<Separator />
				<CardTitle className="text-lg">Sign-Up To Continue</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			{!!error && (
				<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
					<TriangleAlertIcon className="size-4" />
					<p>{error}</p>
				</div>
			)}
			<CardContent className="space-y-5 px-0 pb-0">
				<form onSubmit={onPasswordSignUp} className="space-y-2.5">
					<Input
						disabled={pending}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter Your Email"
						type="email"
						required
					/>
					<Input
						disabled={pending}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter Your Password"
						type="password"
						required
					/>
					<Input
						disabled={pending}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm Your Password"
						type="password"
						required
					/>
					<Button
						type="submit"
						className="w-full"
						size="lg"
						disabled={pending}
					>
						Continue
					</Button>
				</form>
				<Separator />
				<div className="flex flex-col gap-y-2.5">
					<Button
						disabled={pending}
						onClick={() => onProviderSignUp("google")}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FcGoogle className="size-5 absolute top-3 left-3" />
						Continue with Google
					</Button>
					<Button
						disabled={pending}
						onClick={() => onProviderSignUp("github")}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FaGithub className="size-5 absolute top-3 left-3" />
						Continue with Github
					</Button>
				</div>
				<p className="text-xs text-muted-foreground">
					Already have an account?{" "}
					<span
						onClick={() => setState("signIn")}
						className="text-sky-700 hover:underline cursor-pointer"
					>
						Sign-In
					</span>
				</p>
			</CardContent>
		</Card>
	);
};
