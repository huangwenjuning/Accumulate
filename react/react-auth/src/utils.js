export const flatTreeData = (treeData, data) => {
  if (Array.isArray(treeData)) {
    treeData.forEach((item) => {
      data.push(item);

      if (item?.children) {
        flatTreeData(item.children, data);
      }
    });
  }
};