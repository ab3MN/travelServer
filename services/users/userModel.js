'use strict';
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatar: {
      type: String,
      default:
        'http://localhost:5000/users/defaultAvatars/defaultUserAvatar.png',
    },
  },
  { versionKey: false }
);

module.exports = {
  UserModel: model('User', userSchema),
  userValidateSchema: Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  }),
};
