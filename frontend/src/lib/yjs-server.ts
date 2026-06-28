import * as Y from "yjs";

export function base64ToBytes(b64: string): Uint8Array {
  return new Uint8Array(Buffer.from(b64, "base64"));
}
export function bytesToBase64(arr: Uint8Array | Buffer): string {
  return Buffer.from(arr).toString("base64");
}

export function applyUpdates(
  currentState: Uint8Array,
  updatesB64: string[],
): { state: Uint8Array; doc: Y.Doc } {
  const doc = new Y.Doc();
  if (currentState && currentState.length > 0) {
    Y.applyUpdate(doc, currentState);
  }
  for (const upd of updatesB64) {
    Y.applyUpdate(doc, base64ToBytes(upd));
  }
  const state = Y.encodeStateAsUpdate(doc);
  return { state, doc };
}

export function diffForClient(
  serverState: Uint8Array,
  clientStateVectorB64?: string,
): Uint8Array {
  const doc = new Y.Doc();
  if (serverState && serverState.length > 0) {
    Y.applyUpdate(doc, serverState);
  }
  const sv = clientStateVectorB64 ? base64ToBytes(clientStateVectorB64) : undefined;
  return Y.encodeStateAsUpdate(doc, sv);
}

/**
 * Best-effort plain-text extraction from a Y.Doc that may hold either:
 *  (a) Tiptap content in Y.XmlFragment "default" (new format), OR
 *  (b) Legacy plain text in Y.Text "content" (older docs created before
 *      the Tiptap migration).
 *
 * Used for AI prompts and the snapshot diff modal. We walk the XmlFragment
 * collecting text nodes and inserting newlines after block elements.
 */
const BLOCK_NAMES = new Set([
  "paragraph", "heading", "blockquote", "codeBlock", "listItem", "bulletList", "orderedList", "hardBreak",
]);

function xmlNodeText(node: Y.XmlElement | Y.XmlFragment | Y.XmlText | Y.XmlHook): string {
  if (node instanceof Y.XmlText) return node.toString();
  if (node instanceof Y.XmlElement || node instanceof Y.XmlFragment) {
    let out = "";
    const children = node.toArray();
    for (const c of children) {
      out += xmlNodeText(c as Y.XmlElement | Y.XmlText);
    }
    if (node instanceof Y.XmlElement && BLOCK_NAMES.has(node.nodeName)) out += "\n";
    return out;
  }
  return "";
}

export function plainTextFromState(state: Uint8Array): string {
  const doc = new Y.Doc();
  if (state && state.length > 0) Y.applyUpdate(doc, state);
  const frag = doc.getXmlFragment("default");
  const tiptap = xmlNodeText(frag).replace(/\n{3,}/g, "\n\n").trim();
  if (tiptap.length > 0) return tiptap;
  // Legacy fallback
  return doc.getText("content").toString();
}
