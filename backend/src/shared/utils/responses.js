export const successResponse = (res, data = null, message = 'Éxito', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

export const errorResponse = (res, message = 'Error', statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};
