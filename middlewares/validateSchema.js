import Boom from "@hapi/boom";

// validation middleware
const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw Boom.badRequest(error.message);
  }

  next();
};

export default validateSchema;
