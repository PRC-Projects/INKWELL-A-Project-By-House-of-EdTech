import { z } from "zod";

// Hard cap on Yjs update payload size to prevent OOM attacks (256 KB).
export const MAX_UPDATE_BYTES = 256 * 1024;
// Hard cap on snapshot state size (2 MB).
export const MAX_STATE_BYTES = 2 * 1024 * 1024;

const base64Pattern = /^[A-Za-z0-9+/=]+$/;

export const base64Bytes = (maxBytes: number) =>
  z
    .string()
    .min(1)
    .max(Math.ceil((maxBytes * 4) / 3) + 8)
    .regex(base64Pattern, "Invalid base64");

export const syncPushSchema = z.object({
  // Array of base64-encoded Yjs incremental updates, batched.
  updates: z
    .array(
      z.object({
        clientId: z.string().min(1).max(64),
        clock: z.number().int().nonnegative().max(2 ** 31 - 1),
        update: base64Bytes(MAX_UPDATE_BYTES),
      }),
    )
    .min(1)
    .max(200),
  // base64 of the client's current Yjs state vector — server uses this to send back diff
  stateVector: base64Bytes(MAX_UPDATE_BYTES).optional(),
});

export const createDocumentSchema = z.object({
  title: z.string().trim().min(1).max(200),
});

export const updateMembershipSchema = z.object({
  email: z.string().email().max(200),
  role: z.enum(["EDITOR", "VIEWER"]),
});

export const createSnapshotSchema = z.object({
  label: z.string().trim().min(1).max(120),
});

export const registerSchema = z.object({
  email: z.string().email().max(200),
  password: z.string().min(6).max(200),
  name: z.string().trim().min(1).max(80).optional(),
});

export const aiSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("summarize"),
    text: z.string().min(1).max(20_000),
  }),
  z.object({
    action: z.literal("grammar"),
    text: z.string().min(1).max(20_000),
  }),
  z.object({
    action: z.literal("explain-diff"),
    before: z.string().min(0).max(20_000),
    after: z.string().min(0).max(20_000),
  }),
]);
