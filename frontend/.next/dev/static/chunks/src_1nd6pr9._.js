(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            outline: "border border-input bg-card hover:bg-secondary text-foreground",
            ghost: "hover:bg-secondary text-foreground",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            link: "text-primary underline-offset-4 hover:underline",
            soft: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-8 px-3 text-xs",
            lg: "h-11 px-6",
            icon: "h-9 w-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size
        }), className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 37,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/yjs-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "base64ToBytes",
    ()=>base64ToBytes,
    "bytesToBase64",
    ()=>bytesToBase64,
    "useYDoc",
    ()=>useYDoc
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yjs/dist/yjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$y$2d$indexeddb$2f$src$2f$y$2d$indexeddb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/y-indexeddb/src/y-indexeddb.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hocuspocus$2f$provider$2f$dist$2f$hocuspocus$2d$provider$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hocuspocus/provider/dist/hocuspocus-provider.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function colorFromId(id) {
    // Deterministic HSL palette from user id.
    let h = 0;
    for(let i = 0; i < id.length; i++)h = (h * 31 + id.charCodeAt(i)) % 360;
    return `hsl(${h} 70% 45%)`;
}
// Module-level cache so every component sharing the same documentId gets the
// SAME Y.Doc instance. Without this, the page and the Editor each create
// their own doc, IndexedDB+HTTP+Hocuspocus would race and converge slowly.
const _docCache = new Map();
function useYDoc(documentId) {
    _s();
    const persistenceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const providerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [presence, setPresence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [wsConnected, setWsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useYDoc.useMemo[doc]": ()=>{
            if (!documentId) return null;
            let d = _docCache.get(documentId);
            if (!d) {
                d = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Doc"]();
                _docCache.set(documentId, d);
            }
            return d;
        }
    }["useYDoc.useMemo[doc]"], [
        documentId
    ]);
    // IndexedDB persistence — only the first call for a given doc actually
    // attaches; subsequent callers piggy-back on the same Y.Doc.
    const idbAttached = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useYDoc.useEffect": ()=>{
            if (!documentId || ("TURBOPACK compile-time value", "object") === "undefined" || !doc) return;
            if (idbAttached.current) {
                setReady(true);
                return;
            }
            idbAttached.current = true;
            const persistence = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$y$2d$indexeddb$2f$src$2f$y$2d$indexeddb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IndexeddbPersistence"](`docedit:${documentId}`, doc);
            persistenceRef.current = persistence;
            persistence.once("synced", {
                "useYDoc.useEffect": ()=>setReady(true)
            }["useYDoc.useEffect"]);
            const t = setTimeout({
                "useYDoc.useEffect.t": ()=>setReady(true)
            }["useYDoc.useEffect.t"], 400);
            return ({
                "useYDoc.useEffect": ()=>{
                    clearTimeout(t);
                    persistence.destroy();
                    persistenceRef.current = null;
                    idbAttached.current = false;
                }
            })["useYDoc.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useYDoc.useEffect"], [
        documentId,
        doc
    ]);
    // Hocuspocus provider — awareness + live relay on the SAME Y.Doc
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useYDoc.useEffect": ()=>{
            if (!documentId || ("TURBOPACK compile-time value", "object") === "undefined" || !doc) return;
            if (!session?.user) return;
            // One provider per doc — but the hook may be invoked from multiple
            // components for the same doc. Use the cache to enforce singleton.
            let provider = doc._hp;
            const wsProto = window.location.protocol === "https:" ? "wss:" : "ws:";
            const url = `${wsProto}//${window.location.host}/api/hocus`;
            const u = session.user;
            const uid = u.id || u.email || "anon";
            if (!provider) {
                provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hocuspocus$2f$provider$2f$dist$2f$hocuspocus$2d$provider$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HocuspocusProvider"]({
                    url,
                    name: documentId,
                    document: doc
                });
                doc._hp = provider;
            }
            // Each useYDoc caller wires its own listeners so every consumer of
            // wsConnected/presence gets updates, not just the one that created
            // the provider.
            const handleConnect = {
                "useYDoc.useEffect.handleConnect": ()=>setWsConnected(true)
            }["useYDoc.useEffect.handleConnect"];
            const handleDisconnect = {
                "useYDoc.useEffect.handleDisconnect": ()=>setWsConnected(false)
            }["useYDoc.useEffect.handleDisconnect"];
            provider.on("connect", handleConnect);
            provider.on("disconnect", handleDisconnect);
            provider.on("close", handleDisconnect);
            // Some Hocuspocus versions also expose a `synced` event that fires after
            // initial sync — treat it as a positive connection signal as a fallback.
            provider.on("synced", handleConnect);
            // If we attached after the connect event already fired, fall back to a
            // short timer that polls the public status getter.
            const t = setInterval({
                "useYDoc.useEffect.t": ()=>{
                    const s = provider.status;
                    const isConnected = provider.isConnected;
                    if (s === "connected" || isConnected === true) {
                        setWsConnected(true);
                        clearInterval(t);
                    }
                }
            }["useYDoc.useEffect.t"], 500);
            setTimeout({
                "useYDoc.useEffect": ()=>clearInterval(t)
            }["useYDoc.useEffect"], 10_000);
            provider.setAwarenessField("user", {
                id: uid,
                name: u.name || u.email || "Anonymous",
                color: colorFromId(uid)
            });
            const onAware = {
                "useYDoc.useEffect.onAware": ()=>{
                    const states = Array.from(provider.awareness?.getStates().values() ?? []);
                    const out = [];
                    const seen = new Set();
                    for (const s of states){
                        if (!s.user || seen.has(s.user.id)) continue;
                        seen.add(s.user.id);
                        out.push({
                            ...s.user,
                            caret: s.caret ?? null
                        });
                    }
                    // Exclude self
                    setPresence(out.filter({
                        "useYDoc.useEffect.onAware": (p)=>p.id !== uid
                    }["useYDoc.useEffect.onAware"]));
                }
            }["useYDoc.useEffect.onAware"];
            provider.awareness?.on("change", onAware);
            onAware();
            providerRef.current = provider;
            return ({
                "useYDoc.useEffect": ()=>{
                    provider.awareness?.off("change", onAware);
                    provider.off("connect", handleConnect);
                    provider.off("disconnect", handleDisconnect);
                    provider.off("close", handleDisconnect);
                    provider.off("synced", handleConnect);
                    clearInterval(t);
                    providerRef.current = null;
                }
            })["useYDoc.useEffect"];
        }
    }["useYDoc.useEffect"], [
        documentId,
        doc,
        session?.user
    ]);
    const setCaret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useYDoc.useMemo[setCaret]": ()=>({
                "useYDoc.useMemo[setCaret]": (caret)=>{
                    const p = providerRef.current || doc?._hp;
                    p?.setAwarenessField("caret", caret);
                }
            })["useYDoc.useMemo[setCaret]"]
    }["useYDoc.useMemo[setCaret]"], [
        doc
    ]);
    return {
        doc,
        ready,
        presence,
        wsConnected,
        setCaret
    };
}
_s(useYDoc, "D3we9DFB2+TtqKfZMooXvTgLqjU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
function bytesToBase64(buf) {
    let binary = "";
    for(let i = 0; i < buf.length; i++)binary += String.fromCharCode(buf[i]);
    return btoa(binary);
}
function base64ToBytes(b64) {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for(let i = 0; i < bin.length; i++)out[i] = bin.charCodeAt(i);
    return out;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/useSyncEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSyncEngine",
    ()=>useSyncEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/syncSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/yjs-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yjs/dist/yjs.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
/**
 * The sync engine — wires Yjs to Redux to the network.
 *
 * - Captures every local Yjs update and pushes it onto the Redux queue.
 *   The UI never blocks on the network; typing latency is independent of
 *   network state.
 * - When online, drains the queue: groups all pending updates into one
 *   request, sends to /api/.../sync. Server applies them and returns the
 *   merged remote diff which we apply to the Yjs doc.
 * - On ack failure, the updates stay in the queue and will retry next tick.
 *   Because the server's persisted dedup key is (clientId, clock), retries
 *   are safe — duplicates are skipped.
 */ const TICK_MS = 1500;
function getClientId() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let id = localStorage.getItem("docedit:clientId");
    if (!id) {
        id = `c_${crypto.randomUUID()}`;
        localStorage.setItem("docedit:clientId", id);
    }
    return id;
}
function loadClock() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return parseInt(localStorage.getItem("docedit:clock") || "0", 10) || 0;
}
function saveClock(c) {
    if ("TURBOPACK compile-time truthy", 1) localStorage.setItem("docedit:clock", String(c));
}
function useSyncEngine(documentId, doc, canWrite) {
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const queue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "useSyncEngine.useSelector[queue]": (s)=>s.sync.queue
    }["useSyncEngine.useSelector[queue]"]);
    const isOnline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "useSyncEngine.useSelector[isOnline]": (s)=>s.sync.isOnline
    }["useSyncEngine.useSelector[isOnline]"]);
    const clock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "useSyncEngine.useSelector[clock]": (s)=>s.sync.clock
    }["useSyncEngine.useSelector[clock]"]);
    const clientId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(getClientId());
    const queueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(queue);
    const clockRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(clock);
    queueRef.current = queue;
    clockRef.current = clock;
    // Online / offline events
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSyncEngine.useEffect": ()=>{
            const on = {
                "useSyncEngine.useEffect.on": ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setOnline"])(true))
            }["useSyncEngine.useEffect.on"];
            const off = {
                "useSyncEngine.useEffect.off": ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setOnline"])(false))
            }["useSyncEngine.useEffect.off"];
            window.addEventListener("online", on);
            window.addEventListener("offline", off);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setOnline"])(navigator.onLine));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hydrateClock"])(loadClock()));
            return ({
                "useSyncEngine.useEffect": ()=>{
                    window.removeEventListener("online", on);
                    window.removeEventListener("offline", off);
                }
            })["useSyncEngine.useEffect"];
        }
    }["useSyncEngine.useEffect"], [
        dispatch
    ]);
    // Capture local Yjs updates → queue
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSyncEngine.useEffect": ()=>{
            if (!doc || !canWrite) return;
            const handler = {
                "useSyncEngine.useEffect.handler": (update, origin)=>{
                    // Updates originating from remote sync must NOT be re-queued.
                    if (origin === "remote") return;
                    const id = crypto.randomUUID();
                    const next = clockRef.current + 1;
                    const pending = {
                        id,
                        clientId: clientId.current,
                        clock: next,
                        documentId,
                        update: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToBase64"])(update),
                        enqueuedAt: Date.now()
                    };
                    saveClock(next);
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bumpClock"])());
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueUpdate"])(pending));
                }
            }["useSyncEngine.useEffect.handler"];
            doc.on("update", handler);
            return ({
                "useSyncEngine.useEffect": ()=>{
                    doc.off("update", handler);
                }
            })["useSyncEngine.useEffect"];
        }
    }["useSyncEngine.useEffect"], [
        doc,
        documentId,
        dispatch,
        canWrite
    ]);
    // Pull initial server state on mount (catch up offline edits made by others)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSyncEngine.useEffect": ()=>{
            if (!doc || !documentId) return;
            let cancelled = false;
            ({
                "useSyncEngine.useEffect": async ()=>{
                    try {
                        const sv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToBase64"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeStateVector"](doc));
                        const r = await fetch(`/api/documents/${documentId}/sync?sv=${encodeURIComponent(sv)}`, {
                            cache: "no-store"
                        });
                        if (!r.ok) return;
                        const data = await r.json();
                        if (cancelled) return;
                        if (data?.serverUpdate) {
                            const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64ToBytes"])(data.serverUpdate);
                            if (bytes.length > 0) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyUpdate"](doc, bytes, "remote");
                        }
                    } catch  {}
                }
            })["useSyncEngine.useEffect"]();
            return ({
                "useSyncEngine.useEffect": ()=>{
                    cancelled = true;
                }
            })["useSyncEngine.useEffect"];
        }
    }["useSyncEngine.useEffect"], [
        doc,
        documentId
    ]);
    // Drain loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSyncEngine.useEffect": ()=>{
            if (!doc) return;
            let stopped = false;
            const tick = {
                "useSyncEngine.useEffect.tick": async ()=>{
                    if (stopped) return;
                    const q = queueRef.current.filter({
                        "useSyncEngine.useEffect.tick.q": (u)=>u.documentId === documentId
                    }["useSyncEngine.useEffect.tick.q"]);
                    if (!isOnline || q.length === 0) {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStatus"])(isOnline ? "online" : "offline"));
                        return;
                    }
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStatus"])("syncing"));
                    const sv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytesToBase64"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeStateVector"](doc));
                    try {
                        const r = await fetch(`/api/documents/${documentId}/sync`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                updates: q.map({
                                    "useSyncEngine.useEffect.tick": (u)=>({
                                            clientId: u.clientId,
                                            clock: u.clock,
                                            update: u.update
                                        })
                                }["useSyncEngine.useEffect.tick"]),
                                stateVector: sv
                            })
                        });
                        if (r.status === 403) {
                            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setError"])("Viewers cannot push state updates"));
                            return;
                        }
                        if (!r.ok) throw new Error(`status ${r.status}`);
                        const data = await r.json();
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ackUpdates"])(q.map({
                            "useSyncEngine.useEffect.tick": (u)=>u.id
                        }["useSyncEngine.useEffect.tick"])));
                        if (data?.serverUpdate) {
                            const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64ToBytes"])(data.serverUpdate);
                            if (bytes.length > 0) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyUpdate"](doc, bytes, "remote");
                        }
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStatus"])("online"));
                    } catch (e) {
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$syncSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setError"])(String(e.message || e)));
                    }
                }
            }["useSyncEngine.useEffect.tick"];
            const i = setInterval(tick, TICK_MS);
            // also tick immediately on online change
            tick();
            return ({
                "useSyncEngine.useEffect": ()=>{
                    stopped = true;
                    clearInterval(i);
                }
            })["useSyncEngine.useEffect"];
        }
    }["useSyncEngine.useEffect"], [
        isOnline,
        doc,
        documentId,
        dispatch
    ]);
}
_s(useSyncEngine, "E7S70YCh9LXsoGVFiqQCouObcLM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Editor",
    ()=>Editor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yjs/dist/yjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/yjs-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSyncEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useSyncEngine.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Editor({ documentId, initialServerState, canEdit }) {
    _s();
    const { doc, ready, presence, setCaret } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useYDoc"])(documentId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSyncEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncEngine"])(documentId, doc, canEdit);
    const elRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastTextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const [, force] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const ytextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Hydrate the local doc with the server state ONCE on mount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            if (!doc) return;
            if (initialServerState) {
                const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64ToBytes"])(initialServerState);
                if (bytes.length > 0) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyUpdate"](doc, bytes, "remote");
            }
            ytextRef.current = doc.getText("content");
        }
    }["Editor.useEffect"], [
        doc,
        initialServerState
    ]);
    // Bind Y.Text → DOM
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            if (!doc || !ready) return;
            const ytext = doc.getText("content");
            ytextRef.current = ytext;
            const refresh = {
                "Editor.useEffect.refresh": ()=>{
                    const current = ytext.toString();
                    if (current === lastTextRef.current) return;
                    lastTextRef.current = current;
                    if (elRef.current && document.activeElement !== elRef.current) {
                        elRef.current.innerText = current;
                    } else if (elRef.current) {
                        const selection = window.getSelection();
                        const caret = selection?.focusOffset ?? 0;
                        elRef.current.innerText = current;
                        try {
                            const node = elRef.current.firstChild ?? elRef.current;
                            const range = document.createRange();
                            const max = node.nodeType === Node.TEXT_NODE ? (node.textContent ?? "").length : 0;
                            range.setStart(node, Math.min(caret, max));
                            range.collapse(true);
                            selection?.removeAllRanges();
                            selection?.addRange(range);
                        } catch  {}
                    }
                    force({
                        "Editor.useEffect.refresh": (n)=>n + 1
                    }["Editor.useEffect.refresh"]);
                }
            }["Editor.useEffect.refresh"];
            refresh();
            ytext.observe(refresh);
            return ({
                "Editor.useEffect": ()=>{
                    ytext.unobserve(refresh);
                }
            })["Editor.useEffect"];
        }
    }["Editor.useEffect"], [
        doc,
        ready
    ]);
    // DOM → Y.Text
    const onInput = ()=>{
        const el = elRef.current;
        const ytext = ytextRef.current;
        if (!el || !ytext || !doc) return;
        const next = el.innerText;
        const prev = ytext.toString();
        if (next === prev) return;
        let start = 0;
        const minLen = Math.min(prev.length, next.length);
        while(start < minLen && prev[start] === next[start])start++;
        let endPrev = prev.length;
        let endNext = next.length;
        while(endPrev > start && endNext > start && prev[endPrev - 1] === next[endNext - 1]){
            endPrev--;
            endNext--;
        }
        doc.transact(()=>{
            if (endPrev > start) ytext.delete(start, endPrev - start);
            if (endNext > start) ytext.insert(start, next.slice(start, endNext));
        }, "local");
        lastTextRef.current = next;
        broadcastCaret();
    };
    // Broadcast caret offset on selection changes
    const broadcastCaret = ()=>{
        const el = elRef.current;
        if (!el) return;
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            setCaret(null);
            return;
        }
        const r = sel.getRangeAt(0);
        if (!el.contains(r.startContainer)) {
            setCaret(null);
            return;
        }
        // count chars before the caret
        let offset = 0;
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while(node){
            if (node === r.startContainer) {
                offset += r.startOffset;
                break;
            }
            offset += (node.textContent ?? "").length;
            node = walker.nextNode();
        }
        setCaret(offset);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            const h = {
                "Editor.useEffect.h": ()=>broadcastCaret()
            }["Editor.useEffect.h"];
            document.addEventListener("selectionchange", h);
            return ({
                "Editor.useEffect": ()=>document.removeEventListener("selectionchange", h)
            })["Editor.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Editor.useEffect"], [
        setCaret
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "paper-card grain rounded-lg p-8 md:p-12 min-h-[60vh] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PresenceLabels, {
                presence: presence
            }, void 0, false, {
                fileName: "[project]/src/components/editor.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: elRef,
                contentEditable: canEdit,
                suppressContentEditableWarning: true,
                onInput: onInput,
                onKeyUp: broadcastCaret,
                onMouseUp: broadcastCaret,
                "data-testid": "editor-surface",
                "data-can-edit": canEdit,
                "data-placeholder": canEdit ? "Start writing… your edits save locally first." : "You have view-only access.",
                className: "editor-surface relative",
                spellCheck: true
            }, void 0, false, {
                fileName: "[project]/src/components/editor.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CursorOverlay, {
                editorRef: elRef,
                presence: presence
            }, void 0, false, {
                fileName: "[project]/src/components/editor.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReadOnlyHint, {
                canEdit: canEdit
            }, void 0, false, {
                fileName: "[project]/src/components/editor.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/editor.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(Editor, "4p9ANW8qcMMTQ7bTUgaGRWifoH0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useYDoc"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useSyncEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncEngine"]
    ];
});
_c = Editor;
function PresenceLabels({ presence }) {
    if (!presence.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-2 right-3 flex items-center gap-1.5",
        "data-testid": "presence-labels",
        children: [
            presence.slice(0, 6).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "data-testid": `presence-${u.id}`,
                    className: "flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-card border border-border",
                    title: u.name,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-2 w-2 rounded-full",
                            style: {
                                background: u.color
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "max-w-[7rem] truncate",
                            children: u.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)
                    ]
                }, u.id, true, {
                    fileName: "[project]/src/components/editor.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)),
            presence.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-muted-foreground",
                children: [
                    "+",
                    presence.length - 6
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/editor.tsx",
                lineNumber: 168,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/editor.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, this);
}
_c1 = PresenceLabels;
/**
 * Renders each peer's caret as a thin colored bar at the right pixel
 * position by walking the editor's text node and measuring with a Range.
 * Re-runs on every render; cheap because there are few peers.
 */ function CursorOverlay({ editorRef, presence }) {
    _s1();
    const [tick, setTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CursorOverlay.useEffect": ()=>{
            const ro = new ResizeObserver({
                "CursorOverlay.useEffect": ()=>setTick({
                        "CursorOverlay.useEffect": (n)=>n + 1
                    }["CursorOverlay.useEffect"])
            }["CursorOverlay.useEffect"]);
            if (editorRef.current) ro.observe(editorRef.current);
            const onScroll = {
                "CursorOverlay.useEffect.onScroll": ()=>setTick({
                        "CursorOverlay.useEffect.onScroll": (n)=>n + 1
                    }["CursorOverlay.useEffect.onScroll"])
            }["CursorOverlay.useEffect.onScroll"];
            window.addEventListener("scroll", onScroll, true);
            return ({
                "CursorOverlay.useEffect": ()=>{
                    ro.disconnect();
                    window.removeEventListener("scroll", onScroll, true);
                }
            })["CursorOverlay.useEffect"];
        }
    }["CursorOverlay.useEffect"], [
        editorRef
    ]);
    const el = editorRef.current;
    if (!el) return null;
    const text = el.firstChild?.nodeType === Node.TEXT_NODE ? el.firstChild : null;
    if (!text) return null;
    const editorRect = el.getBoundingClientRect();
    const cursors = [];
    for (const u of presence){
        if (u.caret == null) continue;
        const offset = Math.min(Math.max(0, u.caret), text.length);
        try {
            const r = document.createRange();
            r.setStart(text, offset);
            r.setEnd(text, offset);
            const rect = r.getBoundingClientRect();
            cursors.push({
                user: u,
                left: rect.left - editorRect.left,
                top: rect.top - editorRect.top,
                height: rect.height || 18
            });
        } catch  {}
    }
    // ref-only dependency for ResizeObserver tick
    void tick;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0",
        "data-testid": "cursor-overlay",
        children: cursors.map(({ user, left, top, height })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-testid": `remote-cursor-${user.id}`,
                style: {
                    left,
                    top,
                    height,
                    background: user.color
                },
                className: "absolute w-[2px] z-10 animate-pulse",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "absolute -top-5 left-0 text-[10px] font-mono px-1.5 py-0.5 rounded text-white whitespace-nowrap",
                    style: {
                        background: user.color
                    },
                    children: user.name
                }, void 0, false, {
                    fileName: "[project]/src/components/editor.tsx",
                    lineNumber: 228,
                    columnNumber: 11
                }, this)
            }, user.id, false, {
                fileName: "[project]/src/components/editor.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/editor.tsx",
        lineNumber: 220,
        columnNumber: 5
    }, this);
}
_s1(CursorOverlay, "839eW04Tz1hf/F1sZl1qo36v9fQ=");
_c2 = CursorOverlay;
function ReadOnlyHint({ canEdit }) {
    _s2();
    const lastError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "ReadOnlyHint.useSelector[lastError]": (s)=>s.sync.lastError
    }["ReadOnlyHint.useSelector[lastError]"]);
    if (canEdit) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        "data-testid": "viewer-readonly-hint",
        className: "mt-4 text-xs text-muted-foreground italic",
        children: [
            "Read-only — viewers cannot push state updates to the server.",
            lastError ? ` (${lastError})` : ""
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/editor.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}
_s2(ReadOnlyHint, "IIC8wpNYjCuvkUghZ0p9WKOApvk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c3 = ReadOnlyHint;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Editor");
__turbopack_context__.k.register(_c1, "PresenceLabels");
__turbopack_context__.k.register(_c2, "CursorOverlay");
__turbopack_context__.k.register(_c3, "ReadOnlyHint");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sync-status.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SyncStatus",
    ()=>SyncStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function SyncStatus() {
    _s();
    const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SyncStatus.useSelector[status]": (s)=>s.sync.status
    }["SyncStatus.useSelector[status]"]);
    const queueLen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SyncStatus.useSelector[queueLen]": (s)=>s.sync.queue.length
    }["SyncStatus.useSelector[queueLen]"]);
    const lastError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SyncStatus.useSelector[lastError]": (s)=>s.sync.lastError
    }["SyncStatus.useSelector[lastError]"]);
    const lastSyncedAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "SyncStatus.useSelector[lastSyncedAt]": (s)=>s.sync.lastSyncedAt
    }["SyncStatus.useSelector[lastSyncedAt]"]);
    const dotColor = status === "online" ? "bg-emerald-500" : status === "syncing" ? "bg-amber-500" : status === "offline" ? "bg-zinc-400" : "bg-red-500";
    const label = status === "online" ? "Online" : status === "syncing" ? "Syncing" : status === "offline" ? "Offline" : "Error";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-testid": "sync-status",
        "data-status": status,
        className: "flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-full border border-border bg-card/80",
        title: lastError || (lastSyncedAt ? `Last synced ${new Date(lastSyncedAt).toLocaleTimeString()}` : ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-2 w-2 rounded-full animate-pulse-dot", dotColor)
            }, void 0, false, {
                fileName: "[project]/src/components/sync-status.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "data-testid": "sync-status-label",
                className: "font-medium tracking-wide",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/sync-status.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            queueLen > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "data-testid": "sync-queue-count",
                className: "text-muted-foreground",
                children: [
                    "· ",
                    queueLen,
                    " queued"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sync-status.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sync-status.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(SyncStatus, "I3TNbQmSp6RtfBScbFKEu80PIgM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = SyncStatus;
var _c;
__turbopack_context__.k.register(_c, "SyncStatus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background", "disabled:cursor-not-allowed disabled:opacity-50 transition-colors", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Input;
Input.displayName = "Input";
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/snapshot-diff.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SnapshotDiff",
    ()=>SnapshotDiff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
/** Computes a line-level diff (LCS-free greedy) suitable for short documents. */ function diffLines(a, b) {
    const A = a.split("\n");
    const B = b.split("\n");
    const out = [];
    let i = 0, j = 0;
    while(i < A.length || j < B.length){
        if (i < A.length && j < B.length && A[i] === B[j]) {
            out.push({
                type: "same",
                text: A[i]
            });
            i++;
            j++;
        } else if (j < B.length && !A.includes(B[j], i)) {
            out.push({
                type: "add",
                text: B[j]
            });
            j++;
        } else if (i < A.length) {
            out.push({
                type: "del",
                text: A[i]
            });
            i++;
        } else {
            out.push({
                type: "add",
                text: B[j]
            });
            j++;
        }
    }
    return out;
}
function SnapshotDiff({ documentId, snapshotId, onClose }) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [explanation, setExplanation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [explaining, setExplaining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SnapshotDiff.useEffect": ()=>{
            fetch(`/api/documents/${documentId}/snapshots/${snapshotId}`).then({
                "SnapshotDiff.useEffect": (r)=>r.json()
            }["SnapshotDiff.useEffect"]).then(setData);
        }
    }["SnapshotDiff.useEffect"], [
        documentId,
        snapshotId
    ]);
    if (!data) return null;
    const diff = diffLines(data.snapshot.text, data.current.text);
    const explainDiff = async ()=>{
        setExplaining(true);
        setExplanation(null);
        try {
            const r = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "explain-diff",
                    before: data.snapshot.text.slice(0, 20_000),
                    after: data.current.text.slice(0, 20_000)
                })
            });
            const j = await r.json();
            setExplanation(j.result || j.error || "(no response)");
        } finally{
            setExplaining(false);
        }
    };
    const downloadMd = ()=>{
        const md = `# ${data.current.title}\n\n_Diff vs. snapshot "${data.snapshot.label}" (${new Date(data.snapshot.createdAt).toLocaleString()})_\n\n` + diff.map((d)=>d.type === "add" ? `+ ${d.text}` : d.type === "del" ? `- ${d.text}` : `  ${d.text}`).join("\n");
        const blob = new Blob([
            md
        ], {
            type: "text/markdown"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.current.title}-diff.md`;
        a.click();
        URL.revokeObjectURL(url);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-testid": "snapshot-diff-modal",
        className: "fixed inset-0 z-40 bg-foreground/40 flex items-center justify-center p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "paper-card rounded-lg max-w-3xl w-full max-h-[80vh] flex flex-col",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between p-4 border-b border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs uppercase tracking-wide text-muted-foreground",
                                    children: "Diff vs snapshot"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/snapshot-diff.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-display text-lg",
                                    "data-testid": "snapshot-diff-label",
                                    children: data.snapshot.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/snapshot-diff.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/snapshot-diff.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: explainDiff,
                                    disabled: explaining,
                                    "data-testid": "snapshot-diff-explain",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/snapshot-diff.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        " ",
                                        explaining ? "Explaining…" : "AI explain"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/snapshot-diff.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: downloadMd,
                                    "data-testid": "snapshot-diff-export",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/snapshot-diff.tsx",
                                            lineNumber: 94,
                                            columnNumber: 105
                                        }, this),
                                        " Markdown"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/snapshot-diff.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "icon",
                                    onClick: onClose,
                                    "data-testid": "snapshot-diff-close",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/snapshot-diff.tsx",
                                        lineNumber: 95,
                                        columnNumber: 101
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/snapshot-diff.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/snapshot-diff.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/snapshot-diff.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                explanation !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-3 border-b border-border bg-secondary/40",
                    "data-testid": "snapshot-diff-explanation",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-wide text-muted-foreground mb-1",
                            children: "AI Summary"
                        }, void 0, false, {
                            fileName: "[project]/src/components/snapshot-diff.tsx",
                            lineNumber: 100,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: explanation
                        }, void 0, false, {
                            fileName: "[project]/src/components/snapshot-diff.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/snapshot-diff.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-y-auto p-4 font-mono text-xs",
                    "data-testid": "snapshot-diff-body",
                    children: diff.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-testid": `diff-line-${d.type}`,
                            className: d.type === "add" ? "bg-emerald-500/15 text-emerald-700 px-2 rounded" : d.type === "del" ? "bg-red-500/10 text-red-700 px-2 rounded line-through" : "px-2 text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block w-4",
                                    children: d.type === "add" ? "+" : d.type === "del" ? "−" : " "
                                }, void 0, false, {
                                    fileName: "[project]/src/components/snapshot-diff.tsx",
                                    lineNumber: 115,
                                    columnNumber: 15
                                }, this),
                                d.text || "\u00A0"
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/snapshot-diff.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/snapshot-diff.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/snapshot-diff.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/snapshot-diff.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(SnapshotDiff, "kEdjv8OsCA6ah3RjV6Q6kXSmEZk=");
_c = SnapshotDiff;
var _c;
__turbopack_context__.k.register(_c, "SnapshotDiff");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/version-history.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VersionHistory",
    ()=>VersionHistory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/yjs/dist/yjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/yjs-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$snapshot$2d$diff$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/snapshot-diff.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function VersionHistory({ documentId, doc, canEdit }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [label, setLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [creating, setCreating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [diffId, setDiffId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const load = async ()=>{
        const r = await fetch(`/api/documents/${documentId}/snapshots`);
        if (!r.ok) return;
        const j = await r.json();
        setItems(j.snapshots);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VersionHistory.useEffect": ()=>{
            if (open) void load();
        }
    }["VersionHistory.useEffect"], [
        open,
        documentId
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    const createSnapshot = async ()=>{
        if (!label.trim()) return;
        setCreating(true);
        try {
            const r = await fetch(`/api/documents/${documentId}/snapshots`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    label: label.trim()
                })
            });
            if (!r.ok) throw new Error(await r.text());
            setLabel("");
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Snapshot saved");
            await load();
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Could not save snapshot", {
                description: String(e)
            });
        } finally{
            setCreating(false);
        }
    };
    const restore = async (id)=>{
        if (!doc) return;
        if (!confirm("Restore this version? Your current text will be replaced by the snapshot's text; offline edits remain in your history.")) return;
        const r = await fetch(`/api/documents/${documentId}/snapshots/${id}/restore`, {
            method: "POST"
        });
        if (!r.ok) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Restore failed");
            return;
        }
        const j = await r.json();
        if (j?.serverUpdate) {
            const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64ToBytes"])(j.serverUpdate);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yjs$2f$dist$2f$yjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyUpdate"](doc, bytes, "remote");
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Version restored");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "sm",
                variant: "outline",
                onClick: ()=>setOpen((v)=>!v),
                "data-testid": "version-history-toggle",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/version-history.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    " History"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/version-history.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-testid": "version-history-panel",
                className: "absolute right-0 mt-2 w-[360px] z-30 paper-card rounded-lg p-4 animate-fade-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-display mb-3",
                        children: "Version timeline"
                    }, void 0, false, {
                        fileName: "[project]/src/components/version-history.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                value: label,
                                placeholder: "Snapshot label (e.g. 'pre-AI rewrite')",
                                onChange: (e)=>setLabel(e.target.value),
                                "data-testid": "snapshot-label-input"
                            }, void 0, false, {
                                fileName: "[project]/src/components/version-history.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: createSnapshot,
                                disabled: creating || !label.trim(),
                                size: "sm",
                                "data-testid": "snapshot-save-btn",
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/src/components/version-history.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/version-history.tsx",
                        lineNumber: 97,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-72 overflow-y-auto space-y-2",
                        "data-testid": "snapshot-list",
                        children: [
                            items.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground italic",
                                children: "No snapshots yet. Save one to create a recoverable checkpoint."
                            }, void 0, false, {
                                fileName: "[project]/src/components/version-history.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            items.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-testid": `snapshot-row-${s.id}`,
                                    className: "flex items-center justify-between rounded-md border border-border/60 p-2.5 hover:bg-secondary/40",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium truncate",
                                                    "data-testid": `snapshot-label-${s.id}`,
                                                    children: s.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/version-history.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: [
                                                        new Date(s.createdAt).toLocaleString(),
                                                        " · ",
                                                        s.createdBy.name ?? s.createdBy.email
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/version-history.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/version-history.tsx",
                                            lineNumber: 119,
                                            columnNumber: 17
                                        }, this),
                                        canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "icon",
                                                    variant: "ghost",
                                                    onClick: ()=>setDiffId(s.id),
                                                    "data-testid": `snapshot-diff-${s.id}`,
                                                    title: "Preview diff",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/version-history.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/version-history.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ()=>restore(s.id),
                                                    "data-testid": `snapshot-restore-${s.id}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/version-history.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 23
                                                        }, this),
                                                        " Restore"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/version-history.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/version-history.tsx",
                                            lineNumber: 126,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, s.id, true, {
                                    fileName: "[project]/src/components/version-history.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/version-history.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    diffId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$snapshot$2d$diff$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SnapshotDiff"], {
                        documentId: documentId,
                        snapshotId: diffId,
                        onClose: ()=>setDiffId(null)
                    }, void 0, false, {
                        fileName: "[project]/src/components/version-history.tsx",
                        lineNumber: 143,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/version-history.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/version-history.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(VersionHistory, "psYKe7az9dkjep9+dqHZ8xYREtY=");
_c = VersionHistory;
var _c;
__turbopack_context__.k.register(_c, "VersionHistory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ai-assistant.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIAssistant",
    ()=>AIAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scan-text.js [app-client] (ecmascript) <export default as ScanText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$spell$2d$check$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SpellCheck2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/spell-check-2.js [app-client] (ecmascript) <export default as SpellCheck2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function AIAssistant({ doc, canEdit }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const run = async (action)=>{
        if (!doc) return;
        const text = doc.getText("content").toString().trim();
        if (text.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].message("Nothing to analyze yet — start writing first.");
            return;
        }
        setLoading(action);
        setResult(null);
        try {
            const r = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action,
                    text: text.slice(0, 20_000)
                })
            });
            if (!r.ok) throw new Error((await r.json().catch(()=>({})))?.error ?? r.statusText);
            const j = await r.json();
            setResult(j.result || "");
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("AI request failed", {
                description: String(e.message || e)
            });
        } finally{
            setLoading(null);
        }
    };
    const applyToDoc = ()=>{
        if (!doc || !result) return;
        const ytext = doc.getText("content");
        doc.transact(()=>{
            const cur = ytext.toString();
            if (cur.length > 0) ytext.delete(0, cur.length);
            ytext.insert(0, result);
        }, "local");
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Replaced document with AI output");
        setOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "sm",
                onClick: ()=>setOpen((v)=>!v),
                "data-testid": "ai-toggle",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai-assistant.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    " AI Assistant"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai-assistant.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-testid": "ai-panel",
                className: "absolute right-0 mt-2 w-[380px] z-30 paper-card rounded-lg p-4 animate-fade-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-display mb-3",
                        children: "Smart AI Assistant"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai-assistant.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                onClick: ()=>run("summarize"),
                                disabled: loading !== null,
                                "data-testid": "ai-summarize-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanText$3e$__["ScanText"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai-assistant.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    loading === "summarize" ? "Summarizing…" : "Summarize"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai-assistant.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "outline",
                                onClick: ()=>run("grammar"),
                                disabled: loading !== null,
                                "data-testid": "ai-grammar-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$spell$2d$check$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SpellCheck2$3e$__["SpellCheck2"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ai-assistant.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    loading === "grammar" ? "Fixing…" : "Fix grammar"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ai-assistant.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai-assistant.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    result !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        "data-testid": "ai-result-container",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-h-56 overflow-y-auto rounded-md border border-border/70 bg-background p-3 text-sm whitespace-pre-wrap",
                                "data-testid": "ai-result-text",
                                children: result
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai-assistant.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            canEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                onClick: applyToDoc,
                                "data-testid": "ai-apply-btn",
                                children: "Replace document with this"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ai-assistant.tsx",
                                lineNumber: 87,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ai-assistant.tsx",
                        lineNumber: 82,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai-assistant.tsx",
                lineNumber: 56,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai-assistant.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(AIAssistant, "8R6KmGqvegUvui/xblHF8Kp8cbw=");
_c = AIAssistant;
var _c;
__turbopack_context__.k.register(_c, "AIAssistant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/share-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShareDialog",
    ()=>ShareDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserMinus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-minus.js [app-client] (ecmascript) <export default as UserMinus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ShareDialog({ documentId, isOwner, owner, memberships, onChange }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("EDITOR");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!isOwner) return null;
    const invite = async ()=>{
        if (!email.trim()) return;
        setBusy(true);
        try {
            const r = await fetch(`/api/documents/${documentId}/permissions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.trim(),
                    role
                })
            });
            if (!r.ok) throw new Error((await r.json().catch(()=>({})))?.error ?? r.statusText);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Granted ${role.toLowerCase()} access to ${email}`);
            setEmail("");
            onChange();
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Could not share", {
                description: String(e.message || e)
            });
        } finally{
            setBusy(false);
        }
    };
    const remove = async (userId)=>{
        const r = await fetch(`/api/documents/${documentId}/permissions?userId=${userId}`, {
            method: "DELETE"
        });
        if (r.ok) onChange();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "sm",
                variant: "outline",
                onClick: ()=>setOpen((v)=>!v),
                "data-testid": "share-toggle",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/share-dialog.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    " Share"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/share-dialog.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-testid": "share-panel",
                className: "absolute right-0 mt-2 w-[400px] z-30 paper-card rounded-lg p-4 animate-fade-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-display mb-3",
                        children: "Manage collaborators"
                    }, void 0, false, {
                        fileName: "[project]/src/components/share-dialog.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 items-center mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                value: email,
                                type: "email",
                                placeholder: "collaborator@email.com",
                                onChange: (e)=>setEmail(e.target.value),
                                "data-testid": "share-email-input"
                            }, void 0, false, {
                                fileName: "[project]/src/components/share-dialog.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: role,
                                onChange: (e)=>setRole(e.target.value),
                                "data-testid": "share-role-select",
                                className: "h-10 rounded-md border border-input bg-card px-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "EDITOR",
                                        children: "Editor"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/share-dialog.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "VIEWER",
                                        children: "Viewer"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/share-dialog.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/share-dialog.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: invite,
                                disabled: busy,
                                size: "sm",
                                "data-testid": "share-invite-btn",
                                children: "Invite"
                            }, void 0, false, {
                                fileName: "[project]/src/components/share-dialog.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/share-dialog.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5 max-h-56 overflow-y-auto",
                        "data-testid": "member-list",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-2 py-1.5 rounded border border-border/60 bg-secondary/30",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: owner.name ?? owner.email
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/share-dialog.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium uppercase tracking-wide text-primary",
                                        children: "Owner"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/share-dialog.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/share-dialog.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            memberships.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-2 py-1.5 rounded border border-border/60",
                                    "data-testid": `member-row-${m.user.id}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm min-w-0 truncate",
                                            children: m.user.name ?? m.user.email
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/share-dialog.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs uppercase tracking-wide text-muted-foreground",
                                                    "data-testid": `member-role-${m.user.id}`,
                                                    children: m.role
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/share-dialog.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "icon",
                                                    variant: "ghost",
                                                    onClick: ()=>remove(m.user.id),
                                                    "data-testid": `member-remove-${m.user.id}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserMinus$3e$__["UserMinus"], {
                                                        className: "h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/share-dialog.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/share-dialog.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/share-dialog.tsx",
                                            lineNumber: 92,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, m.id, true, {
                                    fileName: "[project]/src/components/share-dialog.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/share-dialog.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/share-dialog.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/share-dialog.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(ShareDialog, "aVJGQraYC/D9jdu7zl5fY9YH2EQ=");
_c = ShareDialog;
var _c;
__turbopack_context__.k.register(_c, "ShareDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/documents/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sync$2d$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/sync-status.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$version$2d$history$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/version-history.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ai$2d$assistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ai-assistant.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$share$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/share-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/yjs-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function DocumentPage({ params }) {
    _s();
    const { status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [id, setId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [titleDraft, setTitleDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocumentPage.useEffect": ()=>{
            params.then({
                "DocumentPage.useEffect": (p)=>setId(p.id)
            }["DocumentPage.useEffect"]);
        }
    }["DocumentPage.useEffect"], [
        params
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocumentPage.useEffect": ()=>{
            if (status === "unauthenticated") router.replace("/login");
        }
    }["DocumentPage.useEffect"], [
        status,
        router
    ]);
    const load = async (docId)=>{
        const r = await fetch(`/api/documents/${docId}`, {
            cache: "no-store"
        });
        if (r.status === 404) {
            router.replace("/dashboard");
            return;
        }
        if (!r.ok) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Could not load document");
            return;
        }
        const j = await r.json();
        setData(j.document);
        setTitleDraft(j.document.title);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocumentPage.useEffect": ()=>{
            if (id && status === "authenticated") void load(id);
        }
    }["DocumentPage.useEffect"], [
        id,
        status
    ]);
    // Pull the same Y.Doc handle the Editor will use so siblings (AI, history) can read it.
    const { doc, presence, wsConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useYDoc"])(id ?? "");
    const saveTitle = async ()=>{
        if (!data || !id || titleDraft === data.title) return;
        const r = await fetch(`/api/documents/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleDraft
            })
        });
        if (r.ok) setData({
            ...data,
            title: titleDraft
        });
    };
    if (status !== "authenticated" || !id) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-6 py-16 text-muted-foreground",
            children: "Loading…"
        }, void 0, false, {
            fileName: "[project]/src/app/documents/[id]/page.tsx",
            lineNumber: 62,
            columnNumber: 12
        }, this);
    }
    if (!data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-6 py-16 text-muted-foreground",
            "data-testid": "doc-loading",
            children: "Loading document…"
        }, void 0, false, {
            fileName: "[project]/src/app/documents/[id]/page.tsx",
            lineNumber: 65,
            columnNumber: 12
        }, this);
    }
    const canEdit = data.role === "OWNER" || data.role === "EDITOR";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto px-6 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                asChild: true,
                                variant: "ghost",
                                size: "sm",
                                "data-testid": "back-to-dashboard",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/documents/[id]/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 37
                                        }, this),
                                        " Back"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/documents/[id]/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: titleDraft,
                                onChange: (e)=>setTitleDraft(e.target.value),
                                onBlur: saveTitle,
                                disabled: !data.isOwner,
                                className: "bg-transparent font-display text-2xl outline-none border-b border-transparent focus:border-border min-w-0 flex-1",
                                "data-testid": "doc-title-input"
                            }, void 0, false, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/documents/[id]/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs px-2 py-1 rounded-md bg-secondary uppercase tracking-wide",
                                "data-testid": "doc-role-badge",
                                children: data.role
                            }, void 0, false, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-testid": "presence-indicator",
                                "data-ws-connected": wsConnected,
                                className: "text-xs px-2 py-1 rounded-md bg-card border border-border flex items-center gap-1.5",
                                title: wsConnected ? `${presence.length} other ${presence.length === 1 ? "user" : "users"} live` : "Presence disconnected",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `h-1.5 w-1.5 rounded-full ${wsConnected ? "bg-emerald-500 animate-pulse-dot" : "bg-zinc-400"}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/documents/[id]/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-testid": "presence-count",
                                        children: [
                                            wsConnected ? presence.length : "—",
                                            " live"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/documents/[id]/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$sync$2d$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SyncStatus"], {}, void 0, false, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ai$2d$assistant$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AIAssistant"], {
                                doc: doc,
                                canEdit: canEdit
                            }, void 0, false, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$version$2d$history$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VersionHistory"], {
                                documentId: id,
                                doc: doc,
                                canEdit: canEdit
                            }, void 0, false, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$share$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShareDialog"], {
                                documentId: id,
                                isOwner: data.isOwner,
                                owner: data.owner,
                                memberships: data.memberships.filter((m)=>m.user.id !== data.owner.id),
                                onChange: ()=>load(id)
                            }, void 0, false, {
                                fileName: "[project]/src/app/documents/[id]/page.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/documents/[id]/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/documents/[id]/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Editor"], {
                documentId: id,
                initialServerState: data.state,
                canEdit: canEdit
            }, void 0, false, {
                fileName: "[project]/src/app/documents/[id]/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground italic mt-4",
                "data-testid": "local-first-hint",
                children: "Edits save to IndexedDB instantly. The background sync engine pushes them to the server when online — concurrent edits merge deterministically via Yjs."
            }, void 0, false, {
                fileName: "[project]/src/app/documents/[id]/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/documents/[id]/page.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(DocumentPage, "A8opNUOwtYpUwCSigO6cQnBmhbk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$yjs$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useYDoc"]
    ];
});
_c = DocumentPage;
var _c;
__turbopack_context__.k.register(_c, "DocumentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1nd6pr9._.js.map