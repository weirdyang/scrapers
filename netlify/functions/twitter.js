const bearer = process.env.BEARER;
const key = process.env.KEY;
const secret = process.env.SECRET;
const { TwitterApi } = require('twitter-api-v2');



exports.handler = async function ({ queryStringParameters }) {
  // Instanciate with desired auth type (here's Bearer v2 auth)
  const twitterClient = new TwitterApi(bearer);

  // Tell typescript it's a readonly app
  const roClient = twitterClient.readOnly;

  // Play with the built in methods
  const { q: username } = queryStringParameters;
  if (!username) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: 'no username'
        }, null, 2)
    }
  }
  const user = await roClient.v2.userByUsername(username,
    {
      'user.fields': 'profile_image_url'
    });
  user.data.profile_image_url
  if(user.errors){
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: user.errors[0].detail
        }, null, 2)
    }
  }
  const result = { bearer, key, secret, username, user}
  return { statusCode: 200, body: JSON.stringify(result, null, 2) }
}