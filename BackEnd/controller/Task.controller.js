import mongoose from "mongoose";
import Tasks from "../model/Task.model.js";

export const CreatTasks = async (req, res) => {
  const { title, description, image,deadLine } = req.body; // Include userId in the request body
  const UserId = req.user.UserIds; // Access the user ID from the request object
  console.log("UserId Is :", UserId); // Log the user ID

  try {
    // Validate required fields
    if (!title || !description || !deadLine) {
      return res.status(400).json({ message: "Title, description, and user ID are required.", success: false });
    }

    // Create a new task instance
    const NewTask = new Tasks({
      title: title,
      description: description,
      image: image, // This can be optional based on your model
      UserId: UserId, // Use the userId provided in the request
      deadLine:deadLine
    });

    // Save the new task to the database
    await NewTask.save();
    return res.status(201).json({ success: true, NewTask });
  } catch (error) {
    console.log("Error in Create Task controller", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const getUserOwnTask = async (req, res) => {
  try {
    const userId = req.user.UserIds; 
    

    // Query using UserId field
    const tasks = await Tasks.find({ UserId: userId }).populate('UserId', '_id name email');

 

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

export const updateUserOwnTask = async (req, res) => {
  const { id } = req.params;
  const updatedData= req.body;

 
  try {
    const Task = await Tasks.findByIdAndUpdate(id, updatedData, { new: true });
    if (!Task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(Task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to Updating TAsk", error: error.message });
    res.status(500).json({ message: error.message });
  }
};
export const DeletUserTask =  async (req, res) => {
  // Assuming the task ID is passed as a URL parameter named 'id'
  const taskId = req.params.id; // Make sure this is the correct path

  try {
      // Validate that taskId is a valid ObjectId (optional, but good practice)
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
          return res.status(400).json({ message: "Invalid task ID format" });
      }

      const deletedTask = await Tasks.findByIdAndDelete(taskId);

      if (!deletedTask) {
          return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};

export const getSingleTask = async (req, res) => {
  const { title } = req.query; // Access the title from query parameters
  console.log("Title is:", title); // Log the title

  // Check if the title parameter is provided
  if (!title) {
      return res.status(400).json({ message: "Title query parameter is required" });
  }

  try {
      // Use a case-insensitive regex search to find matching titles
      const tasks = await Tasks.find({ title: { $regex: title, $options: 'i' } });

      // Check if any tasks were found
      if (!tasks || tasks.length === 0) {
          return res.status(404).json({ message: "No tasks found with that title" });
      }

      // Respond with the found tasks
      res.status(200).json(tasks);
  } catch (error) {
      console.error("Error searching tasks:", error);
      res.status(500).json({ message: "Failed to search tasks", error: error.message });
  }
};