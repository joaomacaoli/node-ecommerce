function errorHandler(err, request, response, next) {
  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return response.status(401).json({ message: 'The user is not authorized' })
  }

  if (err.name === 'ValidationError') {
    //  validation error
    return response.status(401).json({ message: err })
  }

  // default to 500 server error
  return response.status(500).json(err)
}

export default errorHandler
