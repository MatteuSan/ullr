import { Observable, Subscription } from 'rxjs'
import { html, directive, render, TemplateResult, Part } from 'lit-html'

type TemplateCallback<T> = (x: T) => TemplateResult

window.customElements.define(
	'ullr-sbsc',
	class<T> extends HTMLElement {
		observable: Observable<T>
		template: TemplateCallback<T>
		subscription: Subscription
		defaultContent: TemplateResult
		connectedCallback() {
			if (this.defaultContent) {
				render(this.defaultContent, this)
			}
			if (!this.observable) {
				return
			}
			this.subscription = this.observable.subscribe(x => {
				render(this.template(x), this)
			})
		}
		disconnectedCallback() {
			if (this.subscription) {
				this.subscription.unsubscribe()
			}
		}
	}
)

const f = <T>(
	observable: Observable<T>,
	template: TemplateCallback<T>,
	defaultContent?: TemplateResult
) => (part: Part) => {
	part.setValue(
		html`
			<ullr-sbsc
				.observable="${observable}"
				.template="${template}"
				.defaultContent="${defaultContent}"
			></ullr-sbsc>
		`
	)
	part.commit()
}

export const subscribe = directive(f)
