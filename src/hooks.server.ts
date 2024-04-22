import { adminAuth } from "$lib/server/firebaseadmin";
import { error, type Handle } from "@sveltejs/kit";

//This will be executed in every server routes.
export const handle = (async ({event, resolve}) => {
  const sessionCookie = event.cookies.get('session');
  try {
    if(!sessionCookie)
        throw error(401, "Invalid session")

    const claims = await adminAuth.verifySessionCookie(sessionCookie!)
    event.locals.userId = claims.uid;
  }
  catch(e) {
    event.locals.userId = null;
    console.error(e);
  }
  return await resolve(event);
}) satisfies Handle;