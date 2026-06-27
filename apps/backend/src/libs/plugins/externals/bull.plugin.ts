import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { createBullBoard } from "@bull-board/api";
import { FastifyAdapter } from "@bull-board/fastify";
import { emailQueue } from "@bull/queues/email.queue";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

export default fp(
  async function (fastify: FastifyInstance) {
    const serverAdapter = new FastifyAdapter();

    createBullBoard({
      queues: [new BullMQAdapter(emailQueue)],
      serverAdapter,
    });

    await fastify.register(serverAdapter.registerPlugin(), {
      prefix: "/admin/queues",
    });
  },
  {
    name: "bull-plugin",
  },
);
