import { envs } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
    main();
    console.log(envs);
})();

function main(): void {
    const server = new Server({
        port: envs.PORT,
        apiPrefix: envs.API_PREFIX,
        routes: AppRoutes.routes
    });
    void server.start();
}