import React from "react";
import { useHistory } from "react-router-dom";
import { Play, CheckCircle, Lock, FileText } from "lucide-react";

function CourseModule({ module, index, courseId }) {
  const history = useHistory();

  const handleStart = () => {
    history.push(`/course/${courseId}/module/${module.id}`);
  };

  return (
    <div className="p-4 rounded-2xl shadow bg-white flex justify-between items-center mb-3">
      <div>
        <h3 className="font-bold text-lg">
          {index + 1}. {module.title}
        </h3>
        <p className="text-gray-500 text-sm">{module.subtitle}</p>
        <p className="text-xs text-gray-400">{module.duration}</p>
      </div>
      <div>
        {module.completed ? (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
            <CheckCircle size={16} /> Completed
          </span>
        ) : module.locked ? (
          <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 flex items-center gap-1">
            <Lock size={16} /> Locked
          </span>
        ) : (
          <button
            onClick={handleStart}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center gap-2"
          >
            {module.type === "quiz" ? (
              <>
                <FileText size={16} /> Take Quiz
              </>
            ) : (
              <>
                <Play size={16} /> Start
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseModule;
