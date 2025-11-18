import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import { useEffect } from "react";
import NavBar from "../components/NavBar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import { executeCode } from "../lib/piston";
import { checkIfTestsPassed } from "../lib/utils";

import confetti from "canvas-confetti";

import toast from "react-hot-toast";

const ProblemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS["two-sum"].starterCode["javascript"]
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
  };

  const handleProblemChange = (problemId) => {
    navigate(`/problems/${problemId}`);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const actualOutput = result.output;

      const isTestPassed = checkIfTestsPassed(actualOutput, expectedOutput);
      if (isTestPassed) {
        triggerConfetti();
        toast.success("All test cases passed!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col">
      <NavBar />

      <dic className="flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30} className="rounded-md">
            {/* LEFT PANEL - PROBLEM DESC  */}
            <ProblemDescription
              problem={currentProblem}
              problemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors duration-200 cursor-col-resize" />

          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={40} minSize={30}>
                {/* TOP RIGHT PANEL - CODE EDITOR */}
                <CodeEditorPanel
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors duration-200 cursor-row-resize" />

              <Panel defaultSize={60} minSize={30}>
                {/* BOTTOM RIGHT PANEL - OUTPUT */}
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </dic>
    </div>
  );
};

export default ProblemDetails;
