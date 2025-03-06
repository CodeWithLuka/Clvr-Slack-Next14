"use client";

import { LoaderIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "../hooks/use-current-user";

export const UserButton = () => {
	const { data, isLoading } = useCurrentUser();

	if (isLoading) {
		return (
			<LoaderIcon className="size-4 animate-spin text-muted-foreground" />
		);
	}

	if (!data) {
		return null;
	}

	const { email, image, name } = data;

	const avatarFallback = name!.charAt(0).toUpperCase();

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="outline-none relative">
				<Avatar className="size-10 hover:opacity-75 transition">
					<AvatarImage alt={name} src={image} />
					<AvatarFallback>{avatarFallback}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" side="right" className="w-60">
				<DropdownMenuItem></DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
