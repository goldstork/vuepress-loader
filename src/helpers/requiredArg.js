export default (name = 'this') => {
	throw new Error(`"${name}" argument required.`)
}
