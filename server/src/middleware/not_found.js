const not_found = (req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
}

module.exports = not_found