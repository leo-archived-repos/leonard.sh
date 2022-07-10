import { Theme, useTheme } from '~/theme';

export default function Index() {
	const [, setTheme] = useTheme();

	return (
		<>
			<div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
				<button
					className="font-sans text-sm font-medium text-black/60 dark:text-white/60"
					type="button"
					onClick={() =>
						setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK))
					}
				>
					Toggle theme
				</button>
				<div className="absolute top-[50vh] left-[50vw] -translate-x-1/2 -translate-y-1/2">
					<h1 className="font-sans text-4xl text-black/60 dark:text-white/60">
						Be right back.
					</h1>
				</div>
			</div>
		</>
	);
}
