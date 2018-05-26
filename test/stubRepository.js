let matches = [];

const getAll = () => {
  return new Promise(resolve => resolve(matches))
};
const update = (entityName, id, dataToUpdate) =>
  new Promise(resolve => {
    const match = matches.find(x => x.id === id);

    if (match) {
      Object.assign(match, dataToUpdate);
      resolve();
      return;
    }
    reject();
  });
const init = (data) => {
  matches = data;
}

module.exports = {
  getAll,
  update,
  init,
}
