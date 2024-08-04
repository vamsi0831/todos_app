const Todo = require('../Models/todo.model');

exports.createTodo = async (req, res) => {
  const { todo} = req.body;

  try {
    const newTodo = new Todo({
      user,
      todo,
    });
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo },
      { new: true }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
