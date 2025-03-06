"use client";

import Image from "next/image";

const JoinPage = () => {
	return (
		<div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
			<Image
				src="/images/logo.svg"
				alt="Clvr Logo"
				height={60}
				width={60}
			/>
		</div>
	);
};

export default JoinPage;
