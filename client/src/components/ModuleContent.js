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

  