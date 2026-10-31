export default async function handler(req, res) {
  const code = req.query.code;
  const client_id = process.env.OAUTH_CLIENT_ID || 'Ov23lijiT2MJnKbUomcq';
  const client_secret = process.env.OAUTH_CLIENT_SECRET || 'c2e7dd1078fb7b025403250db01be84621ab784a';
  
  if (!code) {
    return res.status(400).send('Authorization code missing');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).send(`Error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;
    const provider = 'github';

    // Script giao tiếp PostMessage chuẩn của Decap CMS
    const content = `
      <!doctype html>
      <html>
        <body>
          <script>
            (function() {
              function recieveMessage(e) {
                console.log("recieveMessage %o", e);
                window.opener.postMessage(
                  'authorization:${provider}:success:{"token":"${token}","provider":"${provider}"}',
                  e.origin
                );
                window.removeEventListener("message", recieveMessage, false);
              }
              window.addEventListener("message", recieveMessage, false);
              console.log("postMessage %o", "*");
              window.opener.postMessage("authorizing:${provider}", "*");
            })();
          </script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(content);
  } catch (error) {
    return res.status(500).send(`Authentication error: ${error.message}`);
  }
}
