export default function Example() {
  return (
    <div className="text-left p-6 rounded-lg bg-gray-700/20 backdrop-blur">
      <h3 className="text-xl font-medium mb-4 text-gray-200">
        Welcome to QuestionPro
      </h3>
      <ol className="space-y-4 text-gray-300">
        Search for questions by Title or Tags. <br></br>
        <li>
          <strong className="text-gray-200">Question Types:</strong> Filter by:
          <ul className="ml-4 mt-2 space-y-2">
            <li>🔵 MCQ - Multiple choice questions</li>
            <li>📝 Anagrams - Word arrangement puzzles</li>
            <li>📚 Content - Detailed explanations and concepts</li>
          </ul>
        </li>
        <li>
          <strong className="text-gray-200">Quick Actions:</strong>
          <ul className="ml-4 mt-2 space-y-2">
            <li>Click question type pill to expand details </li>
            <li>Use filter button ⚡ for quick question-type filtering</li>
            <li>Navigate results with pagination controls</li>
          </ul>
        </li>
      </ol>
      <div className="mt-6 pt-4 border-t border-gray-600">
        <p className="text-sm text-gray-400">
          Try searching: "What is key to growing a business?"
        </p>
        <br />
        <p className="text-sm text-gray-400">
          PS: The backend is hosted on Render.sh and goes to sleep after some
          time, for your first search, it may take some time (&lt;1min) to wake
          up. All subsequent searches will be faster.
        </p>
      </div>
    </div>
  );
}
