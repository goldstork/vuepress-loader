module.exports = {
	hooks: {
		'pre-commit': 'npm run test && npm run build',
		'pre-push': 'git pull origin master'
	},
}
