import React from "react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({
  problem,
  problemId,
  onProblemChange,
  allProblems,
}) {
  return (
    <div className="h-full overflow-y-auto bg-base-200">
      {/* HEADER SECTION */}
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-2xl font-bold">{problem.title}</h2>
          <span
            className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-base-content/60 text-sm">{problem.category}</p>

        {/* SELECTOR SECTION */}
        <div className="mt-4">
          <select
            className="select select-bordered w-full"
            value={problemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((prob) => (
              <option key={prob.id} value={prob.id}>
                {prob.title} - {prob.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* PROBLEM DESCRIPTION */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-100">
          <h2 className="text-xl font-bold text-base-content">Description</h2>

          <div className="space-y-3 text-base leading-relaxed">
            <p className="mt-3 text-base-content/90 leading-relaxed">
              {problem.description.text}
            </p>
            {problem.description.notes.map((note, idx) => (
              <p key={idx} className="text-base-content/90">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-100">
          <h2 className="text-xl font-bold text-base-content">Examples</h2>
          <div className="space-y-4 mt-4">
            {problem.examples.map((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-sm">{idx + 1}</span>
                  <p className="font-semibold text-base-content">
                    Example {idx + 1}
                  </p>
                </div>
                <div className="bg-base-200 rounded-xl p-4 font-mono text-sm space-y-1.5">
                  {/* INPUT */}
                  <div className="flex gap-2">
                    <span className="text-primary font-bold min-w-[70px]">
                      Input:
                    </span>
                    <span>{example.input}</span>
                  </div>

                  {/* INPUT */}
                  <div className="flex gap-2">
                    <span className="text-secondary font-bold min-w-[70px]">
                      Output:
                    </span>
                    <span>{example.output}</span>
                  </div>

                  {/* EXPLANATION - IF EXISTS */}
                  {example.explanation && (
                    <div className="pt-2 border-t border-base-300 mt-2">
                      <span className="text-base-content/60 font-sans text-sm">
                        <span className="font-semibold">Explanation: </span>
                        {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS SECTION */}
        <div className="p-5 bg-base-100 rounded-xl border border-base-100 shadow-sm">
          <h2 className="text-xl font-bold text-base-content/90 mb-4">
            Constraints
          </h2>
          <ul className="space-y-2 text-base-content">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx}>
                <span className="text-primary"> &#9679; </span>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;
