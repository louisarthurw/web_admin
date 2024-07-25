// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	// Stage 1
	const authCookie = event.cookies.get('auth');
	event.locals.auth = authCookie ? JSON.parse(authCookie) : false;

	// Stage 2
	if (!event.locals.auth && event.url.pathname !== '/') {
		throw redirect(302, '/');
	}

	// Stage 3
	const response = await resolve(event);
	return response;
};
