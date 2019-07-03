import loader from '../src'
import CJSLoader from '../src/cjs'

describe('CJS', () => {
	test('should export loader', () => {
		expect(CJSLoader).toEqual(loader)
	})

	test('should export `raw` flag', () => {
		expect(CJSLoader.raw).toEqual(true)
	})
})
