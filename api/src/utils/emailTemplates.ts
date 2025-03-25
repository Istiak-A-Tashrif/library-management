export const replacePlaceholders = (template, placeholders) => {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        return placeholders.hasOwnProperty(key) ? placeholders[key] : match;
    });
}
