import { ROLE } from "data/roles";

// export const userSchema = {
//   type: "object",
//   properties: {
//     _id: { 
//         type: "string" 
//     },
//     username: { type: "string", format: "email" },
//     firstName: {
//         type: "string",
//     },
//     lastName: {
//         type: "string",
//     },   
//     roles: {
//         type: "array",
//         enum: [Object.values(ROLE)],
//     },
//     // roles: {
//     //   type: ["string"],
//     //   enum: Object.values(ROLE),
//     // },
//     createdOn: {
//         type: "string",
//     },
//   },
//   required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
//   additionalProperties: false,
// };

export const userSchema = {
  type: "object",
  properties: {
    _id: { 
        type: "string" 
    },
    username: { 
        type: "string" 
    },
    firstName: {
        type: "string"
    },
    lastName: {
        type: "string"
    },   
    roles: {
        type: "array",
        items: {
            type: "string",
            enum: Object.values(ROLE),
        },
    },
    createdOn: {
        type: "string"
    },
  },
  required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
  additionalProperties: false,
};

