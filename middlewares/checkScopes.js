import { requiredScopes } from "express-oauth2-jwt-bearer";

// middleware to check jwt scopes
const checkScopes = (scope) => requiredScopes(scope);

export default checkScopes;
