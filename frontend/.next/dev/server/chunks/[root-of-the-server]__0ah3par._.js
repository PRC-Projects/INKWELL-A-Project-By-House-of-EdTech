module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs) <export randomFillSync as default>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomFillSync"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "error",
        "warn"
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "authConfig",
    ()=>authConfig,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
;
;
;
const credSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email().max(200),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6).max(200)
});
const authConfig = {
    trustHost: true,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (creds) {
                const parsed = credSchema.safeParse(creds);
                if (!parsed.success) return null;
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                    where: {
                        email: parsed.data.email
                    }
                });
                if (!user) return null;
                const ok = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(parsed.data.password, user.password);
                if (!ok) return null;
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name ?? undefined
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        async session ({ session, token }) {
            if (token?.uid && session.user) {
                session.user.id = token.uid;
            }
            return session;
        }
    }
};
const { handlers, auth, signIn, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(authConfig);
}),
"[project]/src/lib/rbac.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canManage",
    ()=>canManage,
    "canRead",
    ()=>canRead,
    "canWrite",
    ()=>canWrite,
    "getDocumentAccess",
    ()=>getDocumentAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
;
async function getDocumentAccess(documentId, userId) {
    const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].document.findFirst({
        where: {
            id: documentId,
            OR: [
                {
                    ownerId: userId
                },
                {
                    memberships: {
                        some: {
                            userId
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            ownerId: true,
            memberships: {
                where: {
                    userId
                },
                select: {
                    role: true
                }
            }
        }
    });
    if (!doc) {
        return {
            documentId,
            userId,
            role: null,
            isOwner: false,
            level: "none"
        };
    }
    const isOwner = doc.ownerId === userId;
    const role = isOwner ? __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Role"].OWNER : doc.memberships[0]?.role ?? null;
    let level = "none";
    if (isOwner) level = "own";
    else if (role === __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Role"].EDITOR) level = "edit";
    else if (role === __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["Role"].VIEWER) level = "view";
    return {
        documentId,
        userId,
        role,
        isOwner,
        level
    };
}
function canWrite(access) {
    return access.level === "own" || access.level === "edit";
}
function canRead(access) {
    return access.level !== "none";
}
function canManage(access) {
    return access.level === "own";
}
}),
"[project]/src/lib/yjs-server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyUpdates",
    ()=>applyUpdates,
    "base64ToBytes",
    ()=>base64ToBytes,
    "bytesToBase64",
    ()=>bytesToBase64,
    "diffForClient",
    ()=>diffForClient,
    "plainTextFromState",
    ()=>plainTextFromState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yjs/dist/yjs.mjs [app-route] (ecmascript)");
;
function base64ToBytes(b64) {
    return new Uint8Array(Buffer.from(b64, "base64"));
}
function bytesToBase64(arr) {
    return Buffer.from(arr).toString("base64");
}
function applyUpdates(currentState, updatesB64) {
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Doc"]();
    if (currentState && currentState.length > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyUpdate"](doc, currentState);
    }
    for (const upd of updatesB64){
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyUpdate"](doc, base64ToBytes(upd));
    }
    const state = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeStateAsUpdate"](doc);
    return {
        state,
        doc
    };
}
function diffForClient(serverState, clientStateVectorB64) {
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Doc"]();
    if (serverState && serverState.length > 0) {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyUpdate"](doc, serverState);
    }
    const sv = clientStateVectorB64 ? base64ToBytes(clientStateVectorB64) : undefined;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeStateAsUpdate"](doc, sv);
}
/**
 * Best-effort plain-text extraction from a Y.Doc that may hold either:
 *  (a) Tiptap content in Y.XmlFragment "default" (new format), OR
 *  (b) Legacy plain text in Y.Text "content" (older docs created before
 *      the Tiptap migration).
 *
 * Used for AI prompts and the snapshot diff modal. We walk the XmlFragment
 * collecting text nodes and inserting newlines after block elements.
 */ const BLOCK_NAMES = new Set([
    "paragraph",
    "heading",
    "blockquote",
    "codeBlock",
    "listItem",
    "bulletList",
    "orderedList",
    "hardBreak"
]);
function xmlNodeText(node) {
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XmlText"]) return node.toString();
    if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XmlElement"] || node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XmlFragment"]) {
        let out = "";
        const children = node.toArray();
        for (const c of children){
            out += xmlNodeText(c);
        }
        if (node instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["XmlElement"] && BLOCK_NAMES.has(node.nodeName)) out += "\n";
        return out;
    }
    return "";
}
function plainTextFromState(state) {
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Doc"]();
    if (state && state.length > 0) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyUpdate"](doc, state);
    const frag = doc.getXmlFragment("default");
    const tiptap = xmlNodeText(frag).replace(/\n{3,}/g, "\n\n").trim();
    if (tiptap.length > 0) return tiptap;
    // Legacy fallback
    return doc.getText("content").toString();
}
}),
"[project]/src/app/api/documents/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rbac.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/yjs-server.ts [app-route] (ecmascript)");
;
;
;
;
;
async function GET(_, { params }) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    const userId = session.user.id;
    const { id } = await params;
    const access = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDocumentAccess"])(id, userId);
    if (access.level === "none") return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Not found"
    }, {
        status: 404
    });
    const doc = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].document.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            ownerId: true,
            yjsState: true,
            updatedAt: true,
            owner: {
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            },
            memberships: {
                select: {
                    id: true,
                    role: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true
                        }
                    }
                }
            }
        }
    });
    if (!doc) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Not found"
    }, {
        status: 404
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        document: {
            id: doc.id,
            title: doc.title,
            owner: doc.owner,
            updatedAt: doc.updatedAt,
            role: access.role,
            isOwner: access.isOwner,
            memberships: doc.memberships,
            state: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bytesToBase64"])(new Uint8Array(doc.yjsState))
        }
    });
}
async function PATCH(req, { params }) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    const userId = session.user.id;
    const { id } = await params;
    const access = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDocumentAccess"])(id, userId);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["canManage"])(access)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Forbidden"
    }, {
        status: 403
    });
    const body = await req.json().catch(()=>null);
    if (!body?.title || typeof body.title !== "string" || body.title.length > 200) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Invalid title"
        }, {
            status: 400
        });
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].document.update({
        where: {
            id
        },
        data: {
            title: body.title.trim()
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
}
async function DELETE(_, { params }) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"])();
    if (!session?.user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    const userId = session.user.id;
    const { id } = await params;
    const access = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDocumentAccess"])(id, userId);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["canManage"])(access)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Forbidden"
    }, {
        status: 403
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].document.delete({
        where: {
            id
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ah3par._.js.map