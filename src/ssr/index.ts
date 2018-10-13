import { dom } from './dom'
import { TemplateResult, render } from 'lit-html'

export const ssr = async (
	template: TemplateResult,
	cond: (h: HTMLElement) => boolean
) => {
	const target = dom.window.document.body
	const obs = await new Promise<MutationObserver>(resolve => {
		const observer = new MutationObserver(() => {
			if (cond(target)) {
				observer.disconnect()
				resolve(observer)
			}
		})
		observer.observe(target, {
			attributes: true,
			subtree: true,
			childList: true,
			characterData: true
		})
		render(template, target)
	})
	obs.disconnect()
	return target
}
