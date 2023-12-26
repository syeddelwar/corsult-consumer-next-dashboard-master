export default function removeCircularReferences(obj, seen = new Set()) {
  if (typeof obj === "object" && obj !== null) {
    if (seen.has(obj)) {
      return "[Circular Reference]";
    }
    seen.add(obj);
    const newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      newObj[key] = removeCircularReferences(obj[key], seen);
    }
    return newObj;
  }
  return obj;
}
