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
			<ul className="flex flex-row">
				{allAntonyms.map((antonym, index) => (
					<li key={index} className="border">
						{antonym}
					</li>
				))}
			</ul>
		</div>
	);
}
