export default (source, data) => {
	const obj = { ...source }
	obj.themeConfig.sidebar.push(data)
	return obj
}