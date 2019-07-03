import path from 'path'
import addDataToObject from '../src/helpers/addDataToObject'

describe('AddDataToObject', () => {
	test('should add data to object prop', () => {
		const obj = {
			key: []
		}
		expect(addDataToObject(obj, { prop: 'key', data: 'data' })).toEqual({key: ['data']})
	})

	test('should throw error if pass object without current property', () => {
		const obj = {
			key: []
		}
		expect(() => addDataToObject(obj, { prop: 'prop', data: 'data' })).toThrow()
	})

	test('should throw error if pass not object', () => {
		const obj = []
		expect(() => addDataToObject(obj, { prop: 'prop', data: 'data' })).toThrow()
	})
})
