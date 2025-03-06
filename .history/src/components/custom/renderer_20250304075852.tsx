import Quill from "quill";
import { useEffect, useRef, useState } from "react";

interface RendererProps {
	value: string;
}

export const Renderer = ({ value }: RendererProps) => {
	return (
		<div>
			<h1>Hello</h1>
		</div>
	);
};
