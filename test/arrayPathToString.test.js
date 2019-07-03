import path from 'path'
import arrayPathToString from '../src/helpers/arrayPathToString'

describe('ArrayPathToString', () => {
	test('should convert array path to string', () => {
		const data = ['root', 'dir', 'file.txt']
		expect(arrayPathToString(data)).toEqual(path.resolve('root', 'dir', 'file.txt'))
	})

	test('should throw error if you pass an invalid argument', () => {
		expect(() => arrayPathToString(123)).toThrow()
	})
})
