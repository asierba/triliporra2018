let matches = [];
export function setMatches(data) {
  matches = data;
}

let matchPredictions = [];
export function setPredictions(data) {
  matchPredictions = data;
}

export function getAll(entityName) {
  return new Promise((resolve, reject) => {
    if (entityName === 'match') {
      resolve(matches);
      return;
    }

    if (entityName === 'match-prediction') {
      resolve(matchPredictions);
      return;
    }
    reject('getall failed');
  })
}

export function update(entityName, query, dataToUpdate, upsert=false) {
  let items;
  if (entityName === 'match-prediction') {
    items = matchPredictions;
  } else {
    items = matches;
  }

  return new Promise((resolve, reject) => {
    const item = items.find(x => Object.keys(query).every(key => query[key] === x[key]));

    if (item) {
      Object.assign(item, dataToUpdate);
    } else {

      if (upsert === false) {
        reject(`update '${entityName}' failed`)
        return;
      }

      const newItem = Object.assign({}, query, dataToUpdate);
      items.push(newItem);
    }

    resolve();
    return;
  });
}

