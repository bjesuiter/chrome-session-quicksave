import { Component, h } from '@stencil/core';

@Component({
	tag: 'app-root',
	styleUrl: 'app-root.css',
	shadow: true,
})
export class AppRoot {
	render() {
		return (
			<div>
				<header>
					<h1>Session Quicksave Extension Options</h1>
				</header>

				<main>
					<stencil-router>
						<stencil-route-switch scrollTopOffset={0}>
							<stencil-route url="/" component="app-options-page" exact={true} />
							<stencil-route url="/index.html" component="app-options-page" exact={true} />
							{/* <stencil-route url="/profile/:name" component="app-profile" /> */}
						</stencil-route-switch>
					</stencil-router>
				</main>
			</div>
		);
	}
}
