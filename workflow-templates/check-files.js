const fg = require('fast-glob');

function processFolders(targetFolders) {
  const returnFolders = [];
  targetFolders.forEach(element => {
      returnFolders.push('**/'+ element + '/**');
  });
  return returnFolders;

}

function processFiles(fileTypes) {
  const returnTypes = [];
  fileTypes.forEach(element => {
      returnTypes.push('**/'+ element);
  });
  return returnTypes;

}

function checkAllFiles() {
  const config = require("./config.json");
  const excludeFolders = processFolders(config.exclude_folders);
  const searchFileTypes = processFiles(config.target_filetypes);
  const entries = fg.sync(searchFileTypes, {'cwd': '../', 'ignore': excludeFolders});
  console.log(entries);
  if (entries.length) {
      throw new Error('Invalid file types found!');
  };
  console.log('Finished file check');
  return 'Passed!';
}
checkAllFiles();

module.exports = {
  name: 'Check files',
  callback: checkAllFiles,
};
