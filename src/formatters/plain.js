const stringify = (value) => {
  if (typeof value !== 'object' || value === null) {
    if (typeof value === 'string') {
      return `'${value}'`;
    }

    return `${value}`;
  }

  return '[complex value]';
};

const plain = (tree) => {
  const iter = (currentTree, path = '') => {
    const lines = currentTree.flatMap(({
      type, children, value, key,
    }) => {
      const currentPath = `${path}${path ? '.' : ''}${key}`;
      switch (type) {
        case 'children':
          return iter(children, currentPath);
        case 'changed':
          return `Property '${currentPath}' was updated. From ${stringify(value.value1)} to ${stringify(value.value2)}`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        default:
          return '';
      }
    });

    return lines.filter((el) => el).join('\n');
  };

  return iter(tree);
};

export default plain;
