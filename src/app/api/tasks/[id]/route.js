import { NextResponse } from "next/server";
import connectDB from "../../../../utils/db";
import Task from "../../../../models/Task.js";

// UPDATE a task
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params; 
    const { title, completed } = await req.json(); 
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating task", error: error.message }, { status: 500 });
  }
}

  // DELETE a task
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params; 

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting task", error: error.message }, { status: 500 });
  }
}
