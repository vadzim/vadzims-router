import * as R from "rxjs"
import * as op from "rxjs/operators"
import * as _ from "lodash"

export const run = (observable, cb = undefined) => {
	const subscription = observable.subscribe(cb)
	return () => subscription.unsubscribe()
}

export const repeater = (func, { interval = 1000, start = 0, compare = _.isEqual } = {}) =>
	R.timer(start, interval).pipe(
		op.map(() => func()),
		op.distinctUntilChanged(_.isEqual),
	)

export const logInOut = func => async value => {
	console.log(new Date())
	console.log(value)
	const result = await func(value)	
	if (result !== undefined) console.log(result)
	return result
}

export const runUpdater = (data, processor, { errorInterval = 2 * 60 * 1000 } = {}) => {
	let stop
	return run(data, value => {
		stop?.()
		stop = run(R.timer(0, errorInterval).pipe(op.map(async () => {
			try {
				await processor(value)
				stop()
			} catch (e) {
				console.error(e)
			}
		})))
	})
}
