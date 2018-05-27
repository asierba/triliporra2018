let matches = [];

export function getAll() {
  return new Promise(resolve => resolve(matches))
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

export function init(data) {
  matches = data;
}
