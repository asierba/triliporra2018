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

    if (entityName === 'match-predictions') {
      resolve(matchPredictions);
      return;
    }
    reject();
  })
}

export function update(entityName, id, dataToUpdate) {
  return new Promise(resolve => {
    const match = matches.find(x => x.id === id);

    if (match) {
      Object.assign(match, dataToUpdate);
      resolve();
      return;
    }
    reject();
  });
}

