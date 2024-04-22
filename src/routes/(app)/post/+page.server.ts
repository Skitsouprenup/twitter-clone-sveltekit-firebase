/* Every operation here is only executed in the server */

import { redirect } from "@sveltejs/kit";

export const load = () => {
  throw redirect(303, '/');
};