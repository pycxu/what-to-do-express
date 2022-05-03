const fs = require('fs');
const { resolve } = require('path');

const newDate = () => new Date().toString();

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

const mustBeInArray = (array, id) => {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id == id);
    if (!row) {
      reject({
        message: 'ID is not good',
        status: 404,
      });
    }
    resolve(row);
  });
}

const writeJSONFile = (filename, content) => { // spacing level = 2 for pretty-printing
  fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

// read json file
const readJJONFile = (filename) => {
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'))
  } catch (err) {
    console.log(err);
  }
}

// check if a task already exists
const mustNotInArray = (array, obj) => {
  return new Promise((resolve, reject) => {
    const row = array.find(r => Object.values(r).includes(Object.values(obj)[0]))
    if(row){
      reject({
        message: 'Duplicate content',
        status: 400
      });
    }
    resolve(obj);
  });
}

// reduce duplicate code
const errorResponse = (err, res, code) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(code).json({ message: err.message });
  }
}

module.exports = {
  newDate,
  getNewId,
  mustBeInArray,
  writeJSONFile,
  readJJONFile,
  mustNotInArray,
  errorResponse
};
