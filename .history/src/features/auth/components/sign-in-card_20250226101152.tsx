import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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

export const SignInCard = () => {
	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Welcome To Clvr</CardTitle>
				<CardTitle>Sign-In To Continue</CardTitle>
				<CardDescription>
					Use your email or another service to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5 px-0 pb-0">
				<form className="space-y-2.5">
					<Input
						disabled={false}
						value=""
						onChange={() => {}}
						placeholder="Enter Your Email"
						type="email"
						required
					/>
					<Input
						disabled={false}
						value=""
						onChange={() => {}}
						placeholder="Enter Your Password"
						type="password"
						required
					/>
					<Button
						type="submit"
						className="w-full"
						size="lg"
						disabled={false}
					>
						Continue
					</Button>
				</form>
				<Separator />
				<div className="flex flex-col gap-y-2.5">
					<Button
						disabled={false}
						onClick={() => {}}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FcGoogle className="size-5 absolute top-3 left-3" />
						Continue with Google
					</Button>
					<Button
						disabled={false}
						onClick={() => {}}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FaGithub className="size-5 absolute top-3 left-3" />
						Continue with Github
					</Button>
				</div>
				<p className="text-xs text-muted-foreground">
					Don&apos;t have an account?{" "}
					<span className="text-sky-700 hover:underline cursor-pointer">
						Sign-Up
					</span>
				</p>
			</CardContent>
		</Card>
	);
};
