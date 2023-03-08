const Ajv = require("ajv");

const ajv = new Ajv();

module.exports.RegisterValidation = ajv.compile({
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
    password2: { type: "string" },
    firstname: { type: "string" },
    lastname: { type: "string" },
    phonenumber: { type: "integer" },
  },
  required: [
    "username",
    "password",
    "password2",
    "firstname",
    "lastname",
    "phonenumber",
  ],
  additionalProperties: false,
});

module.exports.LoginValidation = ajv.compile({
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
  required: ["username", "password"],
  additionalProperties: false,
});
