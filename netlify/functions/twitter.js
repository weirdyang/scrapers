const bearer = process.env.BEARER;
const { TwitterApi } = require('twitter-api-v2');
const headers = {
  /* Required for CORS support to work */
  'Access-Control-Allow-Origin': '*',
  /* Required for cookies, authorization headers with HTTPS */
  'Access-Control-Allow-Credentials': true
}


exports.handler = async function ({ queryStringParameters }) {

  try {
    const twitterClient = new TwitterApi(bearer);

    // Tell typescript it's a readonly app
    const roClient = twitterClient.readOnly;

    // Play with the built in methods
    const { q: username } = queryStringParameters;
    if (!username) {
      return {
        statusCode: 500,
        headers,
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

    if (user.errors) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(
          {
            error: user.errors[0].detail
          }, null, 2)
      }
    }
    const result = { username, user }
    return { statusCode: 200,
,
    body: JSON.stringify(result, null, 2) }
  } catch (error) {

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(
        {
          error: 'whoops'
        }, null, 2
      )
    }
  }
  // Instanciate with desired auth type (here's Bearer v2 auth)

}