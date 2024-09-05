declare module 'fastify-mongodb' {
    import { FastifyPluginCallback } from 'fastify';
    const fastifyMongo: FastifyPluginCallback;
    export default fastifyMongo;
}