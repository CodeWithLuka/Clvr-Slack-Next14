"use client";

import { useParams } from "next/navigation";

// interface WorkspaceIdPageProps {
// 	params: {
// 		workspaceId: string;
// 	};
// }

const WorkspaceIdPage = () => {
	const params = useParams();

	return (
		<div>
			<h1>ID: {params.workspaceId}</h1>
		</div>
	);
};

export default WorkspaceIdPage;
