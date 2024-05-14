import { auth } from "express-oauth2-jwt-bearer";
import * as dotenv from "dotenv";

dotenv.config();

// authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: `${process.env.AUTH0_AUDIENCE}`,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  jwksUrl: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

export default checkJwt;
