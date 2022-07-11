import styles from './tailwind.css';
import catchBoundaryStyles from '../styles/catch-boundary.css';

import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
	useLoaderData,
	useTransition
} from '@remix-run/react';

import nProgress from 'nprogress';
import nProgressStyles from 'nprogress/nprogress.css';

import { useEffect } from 'react';

import { ThemeProvider, useTheme } from '~/theme';
import { themeSessionResolver } from './sessions.server';
import ErrorBoundary from './components/ErrorBoundary';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'soonTM',
	viewport: 'width=device-width,initial-scale=1'
});

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
		},
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap'
		},
		{ rel: 'stylesheet', href: styles },
		{ rel: 'stylesheet', href: catchBoundaryStyles },
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

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<html>
			<head>
				<title>Oops!</title>
				<Meta />
				<Links />
			</head>
			<body className="w-screen h-screen overflow-hidden text-green-400 bg-black font-inconsolata text-shadow">
				<ErrorBoundary {...caught} />
				<Scripts />
			</body>
		</html>
	);
}

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
