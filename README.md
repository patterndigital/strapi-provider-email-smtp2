# strapi-provider-email-smtp2
A third-party SMTP email provider for Strapi.

## Installation
In the root directory of your project, run:

```bash
npm i strapi-provider-email-smtp2
```

## Configuration
In your `config/plugins.js`, set the following:

```javascript
module.exports = ({ env }) => ({
  email: {
    provider: 'smtp2',
    providerOptions: {
      host: 'smtp.gmail.com', //SMTP Host
      port: 465   , //SMTP Port
      secure: true,
      username: 'my.username@gmail.com',
      password: 'my.password',
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: 'my.username@gmail.com',
      replyTo: 'my.username@gmail.com',
    },
  },
});
```

Don't forget to allow 'Less Secure Apps' from account security options, if sending via Gmail.


## Usage

Send mail 
```javascript
	  let options={
            to: 'some_user@example.com',
            from: 'admin@mysite.com',
            subject:  "Test message",
            text:  "Test",
            html:  "<div>Test</div>"
          };
          await strapi.plugins['email'].services.email.send(options);
```

Reconfigure provider
```javascript
    let newProviderOptions= {
      host: 'smtp.gmail.com', //SMTP Host
      port: 465   , //SMTP Port
      secure: true,
      username: 'my.username@gmail.com',
      password: 'my.password',
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    };
    await strapi.plugins.email.provider.reinit(newProviderOptions);
```