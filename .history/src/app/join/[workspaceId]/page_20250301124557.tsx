"use client";

import Image from "next/image";
import VerificationInput from "react-verification-input";

const JoinPage = () => {
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
					<h1 className="text-2xl font-bold">Join Workspace</h1>
					<p className="text-md text-muted-foreground">
						Enter the workspace code to join
					</p>
				</div>
				<VerificationInput
					classNames={{
						container: "flex gap-x-2",
						character:
							"uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
					}}
				/>
			</div>
		</div>
	);
};

export default JoinPage;
