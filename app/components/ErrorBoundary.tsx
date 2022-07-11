import { NavLink, type ThrownResponse } from '@remix-run/react';

const ErrorBoundary = ({ data, status, statusText }: ThrownResponse) => {
	return (
		<>
			<div className="pointer-events-none absolute w-full h-full -z-[1] opacity-[0.02]"></div>
			<div className="overlay"></div>
			<div className="absolute h-full text-2xl font-semibold uppercase top-5 left-5">
				Error{' '}
				<span className="errorcode">
					{status} - {statusText}
				</span>
				{data && <p className="output">{data}</p>}
				<NavLink
					to="/"
					className="absolute left-0 text-xl font-light normal-case bottom-10"
				>
					cd ..
				</NavLink>
			</div>
		</>
	);
};

export default ErrorBoundary;
