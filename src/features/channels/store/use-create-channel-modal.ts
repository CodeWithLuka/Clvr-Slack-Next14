import { atom, useAtom } from "jotai";

const createChannelModalAtomState = atom(false);

export const useCreateChannelModal = () => {
	return useAtom(createChannelModalAtomState);
};
