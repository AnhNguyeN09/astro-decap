export default function handler(req, res) {
  const client_id = process.env.OAUTH_CLIENT_ID || 'Ov23lijiT2MJnKbUomcq';
  const redirect_uri = 'https://astro-decap-psi.vercel.app/api/callback';
  const scope = 'repo,user';
  
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${scope}`;
  
  res.redirect(302, authUrl);
}
