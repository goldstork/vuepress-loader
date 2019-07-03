import path from 'path'

export default arrPath => {
	if (Array.isArray(arrPath)) {
		const strArr = arrPath.filter(value => typeof value === 'string')
		return path.resolve(...strArr)
	}
	throw new Error('Expected array argument!')
}
