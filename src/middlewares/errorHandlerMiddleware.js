import HttpStatus from 'http-status-codes';

export default (err, req, res, next) => {
  console.warn({ err });

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
