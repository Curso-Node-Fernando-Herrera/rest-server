const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.GOOGLE_CLI_ID)

async function googleVerify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLI_ID,
  })

  const { name, email, picture: avatar } = ticket.getPayload()
  return { name, email, avatar }
}

module.exports = {
  googleVerify,
}
