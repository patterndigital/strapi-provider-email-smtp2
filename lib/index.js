"use strict";

const _ = require("lodash");
const nodemailer = require("nodemailer");

const toBool = (val) => /^\s*(true|1|on)\s*$/i.test(val);

/* eslint-disable no-unused-vars */
module.exports = {
  init: (config) => {
    let transporter;
    const reinit= (config) => {
        transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: toBool(config.secure),
        auth: {
          user: config.username,
          pass: config.password,
        },
        tls: {
          rejectUnauthorized: toBool(config.rejectUnauthorized),
        },
        requireTLS: toBool(config.requireTLS),
        connectionTimeout: config.connectionTimeout * 60 * 1000, // 5 min
      });
    };
    return {
      send: (options) => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = _.isObject(options) ? options : {};
          options.from = config.nodemailer_default_from || options.from;
          options.replyTo =
            config.nodemailer_default_replyto || options.replyTo;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          const msg = [
            "from",
            "replyTo",
            "to",
            "cc",
            "bcc",
            "subject",
            "text",
            "html",
            "attachments",
          ];

          transporter
            .sendMail(_.pick(options, msg))
            .then(resolve)
            .catch((error) => reject(error));
        });
      },
      reinit: reinit 
    };
  },
};
