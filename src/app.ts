import { envs } from './core';
import { Server } from './server';

(() => {
    main();
})();

function main(): void {
    const server = new Server({ port: envs.PORT, apiPrefix: envs.API_PREFIX });
    void server.start();
}