/* eslint-disable @next/next/no-img-element */
import { XIcon } from "lucide-react";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface ThumbnailProps {
	url: string | null | undefined;
}

export const Thumbnail = ({ url }: ThumbnailProps) => {
	if (!url) return null;

	return (
		<div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
			<img
				src={url}
				alt="Message Image"
				className="rounded-md object-cover size-full"
			/>
		</div>
	);
};
