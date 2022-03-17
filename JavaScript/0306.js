function unique(arr) {
  return Array.from(new Set(arr));
}

function aclean(arr) {
  let map = new Map();

  for (const word of arr) {
    // 将单词 split 成字母， 对字母进行排序， 之后再 join 回来
    let sorted = word // PAN
      .toLowerCase() // pan
      .split('') // ['p', 'a', 'n']
      .sort() // ['a', 'n', 'p']
      .join(''); // anp
    map.set(sorted, word);
  }

  return Array.from(map.values());
}