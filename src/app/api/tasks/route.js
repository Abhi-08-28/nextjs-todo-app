import { NextResponse } from "next/server";
import connectDB from "../../../utils/db";

import Task from "../../../models/Task.js";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB(); 
    const tasks = await Task.find({});
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching tasks", error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title } = await req.json();
    await connectDB();
    const newTask = await Task.create({ title });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating task", error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params; 
    const { title, completed } = await req.json();
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid Task ID" }, { status: 400 });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating task", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectDB();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting task", error: error.message }, { status: 500 });
  }
}
