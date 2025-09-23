import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import summarize from "../utils/summarizer";
import { courses } from "./Courses";


function ModuleContent() {
  const { courseId, moduleId } = useParams();
  const history = useHistory();
  const [completed, setCompleted] = useState(false);

  const course = courses.find((c) => c.id.toString() === courseId);
  const module = course.modules.find((m) => m.id.toString() === moduleId);

  const handleComplete = () => {
    setCompleted(true);
    history.push(`/course/${courseId}`);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => history.push(`/course/${courseId}`)}
        className="text-purple-600 flex items-center gap-2 mb-4"
      >
        <ArrowLeft size={16} /> Back to Course
      </button>

      <h1 className="text-2xl font-bold mb-2">{module.title}</h1>
      <p className="text-gray-500 mb-4">{module.subtitle}</p>

      {module.type === "video" && (
        <div className="mb-4">
          <iframe
            src={module.content}
            title="Video Lesson"
            width="100%"
            height="400"
            className="rounded-xl shadow"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {module.type === "notes" && (
        <div className="mb-4">
          <p className="text-gray-700 mb-4">{module.content}</p>
          <div className="p-4 bg-gray-100 rounded-xl">
            <h3 className="font-bold mb-2">✨ Auto Summary</h3>
            <p className="text-sm text-gray-600">{summarize(module.content)}</p>
          </div>
        </div>
      )}

      {module.type === "quiz" && (
        <div className="mb-4">
          <p className="text-gray-700">{module.content}</p>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Question 1: ...</li>
            <li>Question 2: ...</li>
          </ul>
        </div>
      )}

      <button
        onClick={handleComplete}
        disabled={completed}
        className={`px-6 py-3 rounded-xl text-white flex items-center gap-2 ${
          completed
            ? "bg-green-500 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-blue-500"
        }`}
      >
        <CheckCircle size={20} /> {completed ? "Completed" : "Mark as Complete"}
      </button>
    </div>
  );
}

export default ModuleContent;
