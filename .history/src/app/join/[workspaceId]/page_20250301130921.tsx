"use client";

import Image from "next/image";
import Link from "next/link";
import VerificationInput from "react-verification-input";

import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const JoinPage = () => {
	const workspaceId = useWorkspaceId();

	const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

	return (
		<div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
			<Image
				src="/images/logo.svg"
				alt="Clvr Logo"
				height={60}
				width={60}
			/>
			<div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
				<div className="flex flex-col gap-y-2 items-center justify-center">
					<h1 className="text-2xl font-bold">Join {data?.name}</h1>
					<p className="text-md text-muted-foreground">
						Enter the workspace code to join
					</p>
				</div>
				<VerificationInput
					length={6}
					classNames={{
						container: "flex gap-x-2",
						character:
							"uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
						characterInactive: "bg-muted",
						characterSelected: "bg-white text-black",
						characterFilled: "bg-white text-black",
					}}
					autoFocus
				/>
			</div>
			<div className="flex gap-x-4">
				<Button size="lg" variant="outline" asChild>
					<Link href="/">Back To Home</Link>
				</Button>
			</div>
		</div>
	);
};

export default JoinPage;
