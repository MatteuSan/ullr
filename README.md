Functional Web Components

```
 __  __     __         __         ______
/\ \/\ \   /\ \       /\ \       /\  == \
\ \ \_\ \  \ \ \____  \ \ \____  \ \  __<
 \ \_____\  \ \_____\  \ \_____\  \ \_\ \_\
  \/_____/   \/_____/   \/_____/   \/_/ /_/
```

---

# Installation

```
npm i ullr lit-html rxjs
```

# APIs

## `component`

`component` is a lit-html directive.

Encapsulate the template with Shadow DOM.

```ts
import { html } from 'lit-html'
import { component } from 'ullr/directive'

export const main = (title: string, desc: string) => html`
	${component(html`
		<style>
			h1 {
				color: blue;
			}
		</style>
		<main>
			<h1>${title}</h1>
			<p>${desc}</p>
		</main>
	`)}
`
```

## `subscribe`

`subscribe` is a lit-html directive.

Subscribe to `Observable<T>` of RxJS and re-rendering with callback function.

```ts
import { html } from 'lit-html'
import { subscribe } from 'ullr/directive'
import { timer } from 'rxjs'

export const template = html`
	<main>
		${subscribe(timer(10, 1), x => html`<p>${x}</p>`, html`<p>Default content</p>`)}
	</main>
`
```

## `customElements`

`customElements` creates a class that can be passed to `customElements.define`.

```ts
import { customElements } from 'ullr'
import { main } from './main'

const xApp = customElements(([title, desc]) => main(title, desc), [
	'title',
	'desc'
])

window.customElements.define('x-app', xApp)
```

# Usage

Basic usage:

```ts
import { component, customElements } from 'ullr'
import { html } from 'lit-html'

// Create a template with lit-html
const template = (title: string, desc: string) => html`
	<style>
		h1 {
			font-weight: 400;
		}
		p {
			font-size: 1rem;
		}
	</style>
	<h1>${title}</h1>
	<p>${desc}</p>
`

// Create a CSS scope with `component()`
const app = (title: string, desc: string) => html`${component(template(title, desc))}`

// Create a Custom Elements with `customElements()`
const xApp = customElements(([title, desc]) => app(title, desc), [
	'title',
	'desc'
])

// Register the Custom Elements with `customElements.define()`.
window.customElements.define('x-app', xApp)
```

Template to subscribe RxJS and update:

```ts
import { subscribe } from 'ullr/directive'
import { timer as _timer } from 'rxjs'
import { take, filter } from 'rxjs/operators'

const timer = _timer(10, 1).pipe(
	filter(x => x > 0),
	take(10)
)

const template = html`
	<main>
		${subscribe(
			timer,
			x => html`<p>${x}</p>`,
			html`<p>Default content</p>`
		)}
	</main>
`
```
