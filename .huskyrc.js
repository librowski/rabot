module.exports = {
    hooks: {
        'pre-push': `
            yarn lint --max-warnings=0 &&
            yarn type-check
        `,
    }
}