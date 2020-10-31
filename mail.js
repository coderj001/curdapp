const mailchimp = require("@mailchimp/mailchimp_transactional")(
  "1b657a336a61ebbce467f8661962bbef-us2"
);

const message = {
  from_email: "hello@example.com",
  subject: "Hello world",
  text: "Welcome to Mailchimp Transactional!",
  to: [
    {
      email: "amirajubolchi002@gmail.com",
      type: "to",
    },
  ],
};

async function run() {
  const response = await mailchimp.messages.send({
    message,
  });
  console.log(response);
}
run();
