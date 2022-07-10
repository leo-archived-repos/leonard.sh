import styles from './tailwind.css';

import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useTransition
} from '@remix-run/react';

import nProgress from 'nprogress';
import nProgressStyles from 'nprogress/nprogress.css';

import { useEffect } from 'react';

import { ThemeProvider, useTheme, PreventFlashOnWrongTheme } from '~/theme';
import { themeSessionResolver } from './sessions.server';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'soonTM',
	viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => {
	return [
		{
			rel: 'preconnect',
			href: 'https://fonts.googleapis.com'
		},
		{
			rel: 'preconnect',
			href: 'https://fonts.gstatic.com'
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
		},
		{ rel: 'stylesheet', href: styles },
		{ rel: 'stylesheet', href: nProgressStyles }
	];
};

// Return the theme from the session storage using the loader
export const loader: LoaderFunction = async ({ request }) => {
	const { getTheme } = await themeSessionResolver(request);
	return {
		theme: getTheme()
	};
};

// Wrap your app with ThemeProvider.
// `specifiedTheme` is the stored theme in the session storage.
// `themeAction` is the action name that's used to change the theme in the session storage.
export default function AppWithProviders() {
	const { theme } = useLoaderData();

	return (
		<ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
			<App />
		</ThemeProvider>
	);
}

// Use the theme in your app.
// If the theme is missing in session storage, PreventFlashOnWrongTheme will get
// the browser theme before hydration and will prevent a flash in browser.
// The client code runs conditionally, it won't be rendered if we have a theme in session storage.
function App() {
	const data = useLoaderData();
	const [theme] = useTheme();
	const transition = useTransition();

	useEffect(() => {
		transition.state === 'idle' ? nProgress.done() : nProgress.start();
	}, [transition.state]);

	return (
		<html lang="en" data-theme={theme ?? ''}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Links />
			</head>
			<body className={theme || 'dark'}>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	);
}
