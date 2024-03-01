import React from "react";

export default function Synonyms({ synonymLists }: { synonymLists: string[] }) {
	if (synonymLists === null) {
		return <div></div>;
	}

	var allSynonyms = [];
	for (var i = 0; i < synonymLists.length; i++) {
		for (var j = 0; j < synonymLists[i].length; j++) {
			allSynonyms.push(synonymLists[i][j]);
		}
	}
	return (
		<div>
			<ul className="flex flex-row">
				{allSynonyms.map((synonym, index) => (
					<li key={index} className="border">
						{synonym}
					</li>
				))}
			</ul>
		</div>
	);
}
