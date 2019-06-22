module.exports = {
	hooks: {
		'pre-commit': 'npm run test',
		'pre-push': 'git pull origin master'
	},
}
