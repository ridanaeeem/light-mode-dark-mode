"use client";

import Image from "next/image";
import { useState } from "react";

// [
// 	{
// 		meta: {
// 			id: "hello",
// 			uuid: "7769f83c-93de-46ad-90a6-868da8669904",
// 			src: "coll_thes",
// 			section: "alpha",
// 			target: { tuuid: "0cdef8d5-c9d1-431b-b397-2077a127c328", tsrc: "collegiate" },
// 			stems: ["hello", "hellos"],
// 			syns: [["greeting", "salutation", "salute", "welcome"]],
// 			ants: [["adieu", "bon voyage", "cong\u00e9", "farewell", "Godspeed", "good-bye"]],
// 			offensive: false,
// 		},
// 		hwi: { hw: "hello" },
// 		fl: "noun",
// 		def: [
// 			{
// 				sseq: [
// 					[
// 						[
// 							"sense",
// 							{
// 								dt: [
// 									["text", "an expression of goodwill upon meeting "],
// 									["vis", [{ t: "we said our {it}hellos{/it} and got right down to business" }]],
// 								],
// 								syn_list: [
// 									[{ wd: "greeting" }, { wd: "salutation" }, { wd: "salute" }, { wd: "welcome" }],
// 								],
// 								rel_list: [
// 									[{ wd: "ave" }, { wd: "hail" }],
// 									[{ wd: "amenities" }, { wd: "civilities" }, { wd: "pleasantries" }],
// 									[{ wd: "regards" }, { wd: "respects" }, { wd: "wishes" }],
// 								],
// 								ant_list: [
// 									[
// 										{ wd: "adieu" },
// 										{ wd: "bon voyage" },
// 										{ wd: "cong\u00e9", wvrs: [{ wvl: "also", wva: "congee" }] },
// 										{ wd: "farewell" },
// 										{ wd: "Godspeed" },
// 										{ wd: "good-bye", wvrs: [{ wvl: "or", wva: "good-by" }] },
// 									],
// 								],
// 							},
// 						],
// 					],
// 				],
// 			},
// 		],
// 		shortdef: ["an expression of goodwill upon meeting"],
// 	},
// ];
export default function Home() {
	const [word, setWord] = useState("");
	// const [data, setData] = useState<any>(null);
	const [synonyms, setSynonyms] = useState<any>(null);
	const [antonyms, setAntonyms] = useState<any>(null);
	const [definition, setDefinition] = useState<any>(null);
	const [spellingMistakes, setSpellingMistakes] = useState<any>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=46b21575-6153-47db-ac8a-4565cdf3aef4`
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const jsonData = await response.json();
			// setData(jsonData);
			console.log(jsonData);
			if (jsonData[0].meta) {
				setSynonyms(jsonData[0].meta.syns.flat());
				setAntonyms(jsonData[0].meta.ants.flat());
				setDefinition(jsonData[0].shortdef.flat());
			} else {
				setSpellingMistakes(jsonData);
			}

			// if data[0]
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	return (
		<div className="flex justify-center">
			<main>
				hi
				<form onSubmit={handleSubmit}>
					<input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
					<button type="submit">submit</button>
				</form>
				<p>Synonyms</p>
				{synonyms}
				<br></br>
				<p>Antonyms</p>
				{antonyms}
				<br></br>
				<p>Definition</p>
				{definition}
				<p>Did you mean...</p>
				{spellingMistakes}
			</main>
		</div>
	);
}
