const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
  },
  required: ["bar", "foo"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

const myObject = {
  aaa: "stringcito",
  foo: 123,
};

console.log(validate(myObject));
console.log(validate.errors);
