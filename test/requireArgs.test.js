import path from 'path'
import requiredArg from '../src/helpers/requiredArg'

describe('requireArgs', () => {
	test('should throw error', () => {
		expect(() => requiredArg()).toThrow()
	})

	test('should throw error with correct passed name', () => {
		expect(() => requiredArg('TEST')).toThrow('"TEST" argument required.')
	})
})
