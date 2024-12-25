const asyncWrapper = (asyncFn) => {
    return (req, res, next) => {
        asyncFn(req, res, next).catch((error) => {
            next(error)
        })
    }
}

export default asyncWrapper