export const findFolderById = (data, id) => {
    for (const item of data) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findFolderById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };