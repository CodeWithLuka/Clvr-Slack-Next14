import {
	isAuthenticatedNextjs,
	convexAuthNextjsMiddleware,
	createRouteMatcher,
	nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/sign-in"]);

export default convexAuthNextjsMiddleware((request) => {
	if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
		return nextjsMiddlewareRedirect(request, "/sign-in");
	}
	// TODO: Redirect User from "/sign-in" is user is authenticated
});

export const config = {
	// The following matcher runs middleware on all routes
	// except static assets.
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
