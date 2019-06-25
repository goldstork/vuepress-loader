module.exports = {
	hooks: {
		'pre-commit': 'npm run test && npm run build && git add ./dist/.',
		'pre-push': 'git pull origin master'
	},
}
