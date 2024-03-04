import React from "react";

export default function Suggested({
	spellingMistakes,
	setWord,
}: {
	spellingMistakes: string[];
	setWord: React.Dispatch<React.SetStateAction<string>>;
}) {
	if (spellingMistakes.length === 0) {
		return <div></div>;
	}

	return (
		<div>
			<div>Hmm, did you mean one of these words?</div>
			<ul className="flex flex-wrap justify-center">
				{spellingMistakes.map((suggestion, index) => (
					<li
						key={index}
						className="text-3xl p-[2rem] text-gray-400"
						onClick={() => {
							setWord(suggestion);
						}}>
						<button>{suggestion}</button>
					</li>
				))}
			</ul>
		</div>
	);
}
