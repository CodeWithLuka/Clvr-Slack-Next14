import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

import { ResendOTP } from "./resend-otp";

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [GitHub, Google, Password({ verify: ResendOTP })],
});
