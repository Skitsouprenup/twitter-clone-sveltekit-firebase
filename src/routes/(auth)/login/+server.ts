/* 
  Server endpoints. These endpoints can be accessed by
  using the '/login' endpoint.
*/

import { adminAuth } from "$lib/server/firebaseadmin";
import { json, error } from "@sveltejs/kit";

export const POST = async ({request, cookies}) => {
  const idToken = await request.json();
  const decoded = await adminAuth.verifyIdToken(idToken);
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // Only process if the user just signed in in the last 5 minutes.
  // First, convert getTime() to seconds
  if((new Date().getTime() / 1000) - decoded.auth_time < 5 * 60) {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const options = { path: '/', maxAge: expiresIn, httpOnly: true, secure: true };
    cookies.set('session', sessionCookie, options);
    return json({status: 'success'});
  }
  else {
    throw error(401, 'Invalid authentication. Please re-authenticate.');
  }
}

export const DELETE = async ({cookies}) => {
  cookies.delete('session', { path: '/'});
  //cookies.set("session", "", { path: "/", maxAge: 0})
  return json({status: 'success'});
}