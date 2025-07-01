import Todo from "../models/todo.js";

export const alltodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({todos: todos, length: todos.length});
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const createTodo = async (req, res) => {
  const { title, description, importance, completed } = req.body;

  if (!title || !importance) {
    return res
      .status(400)
      .json({ message: "Title and importance are required" });
  }

  try {
    const newTodo = new Todo({
      title,
      description,
      importance,
      completed,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
    console.log("Todo created successfully:", newTodo);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "Todo with this title already exists" });
    }

    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateTodo = async ( req, res ) =>{
  const { id } = req.params;
  const {title, description, importance, completed} = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, importance, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}