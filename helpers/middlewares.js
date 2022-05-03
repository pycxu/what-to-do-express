const mustBeInteger = (req, res, next) => {
  const id = req.params.id;
  if (!Number.isInteger(parseInt(id))) {
    res.status(400).json({ message: 'ID must be an integer' });
  } else {
    next();
  }
}
const checkFieldsPost = (req, res, next) => {
  const { title, content, tags } = req.body;
  if (title && content) {
    next();
  } else {
    res.status(400).json({ message: 'fields are not good' });
  }
}

const checkFieldsTodo = (req, res, next) => {
  const { task } = req.body;
  if(task) {
    next();
  }else{
    res.status(400).json({ message: 'fields are not good' });
  }
}

module.exports = {
  mustBeInteger,
  checkFieldsPost,
  checkFieldsTodo
};
