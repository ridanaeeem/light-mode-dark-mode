import React from "react";

export default function Antonyms({ antonymLists }: { antonymLists: string[] }) {
	if (antonymLists === null) {
		return <div></div>;
	}
	var allAntonyms = [];
	for (var i = 0; i < antonymLists.length; i++) {
		for (var j = 0; j < antonymLists[i].length; j++) {
			allAntonyms.push(antonymLists[i][j]);
		}
	}
	return (
		<div>
			<ul className="flex flex-wrap justify-center">
				{allAntonyms.map((antonym, index) => (
					<li key={index} className="text-3xl p-[2rem] text-gray-400">
						{antonym}
					</li>
				))}
			</ul>
		</div>
	);
}
