const suggestions = [
    "Analyze my expenses",
    "How can I save more money?",
    "Show my highest expense",
    "Where am I overspending?",
];

const SuggestedQuestions = ({ onSelect }) => {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3">
                Suggested Questions
            </h3>

            <div className="flex flex-wrap gap-3">
                {suggestions.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(question)}
                        className="
                            px-4
                            py-2
                            bg-blue-50
                            text-blue-700
                            rounded-full
                            border
                            border-blue-200
                            hover:bg-blue-100
                            transition
                        "
                    >
                        {question}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SuggestedQuestions;