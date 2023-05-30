/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Express } from 'express';

import { getModules, catchAllRoute } from '../utils';

const router = Router({caseSensitive: true, strict: true}) as Express;

getModules({
    directory: __dirname,
    exempt: ["index\\.(?:js|ts)?", "utils"],
}).forEach((file) => {
    const createRoute = (file as any)?.default;

    if(typeof createRoute === "function"){
        createRoute(router)
    }
})

catchAllRoute(router);

export default router;