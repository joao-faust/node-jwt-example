# node-jwt-example

**node-jwt-example** is a simple authentication example using JSON Web Tokens (JWT)
in a Node.js application. This project includes a token blacklist mechanism to
prevent logged-out users from reusing their tokens . When a user logs out, their
token is added to a Redis-based blacklist, ensuring it cannot be used for unauthorized
access. The example demonstrates user authentication, token generation, validation, and
secure logout handling. Ideal for learning how to implement JWT-based authentication
with token revocation in a Node.js environment.

# Author

João Faust
