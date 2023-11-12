export function omit(obj, keysToOmit) {
    const result = {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !keysToOmit.includes(key)) {
        result[key] = obj[key];
      }
    }
    
    return result;
  }