function union(firstSet, secondSet) {
  const newSet = [...firstSet];
  secondSet.forEach((element) => {
    if (firstSet.indexOf(element) == -1) {
      newSet.push(element);
    }
  });

  return newSet;
}

function intersection(firstSet, secondSet) {
  return firstSet.filter((element) => secondSet.indexOf(element) != -1);
}

function difference(firstSet, secondSet) {
  return firstSet.filter((element) => secondSet.indexOf(element) == -1);
}

function complement(set, universalSet) {
  return universalSet.filter((element) => set.indexOf(element) == -1);
}

module.exports = [union, intersection, difference, complement];
