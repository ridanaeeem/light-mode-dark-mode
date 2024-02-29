"use client";

import { useState } from "react";
import Synonyms from "./components/synonyms";

export default function Home() {
	const [word, setWord] = useState("");
	const [theme, setTheme] = useState("light");
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
			console.log(jsonData);
			console.log(jsonData);
			if (jsonData[0].meta) {
				setSynonyms(jsonData[0].meta.syns.flat());
				setAntonyms(jsonData[0].meta.ants.flat());
				setDefinition(jsonData[0].shortdef.flat());
			} else {
				setSpellingMistakes(jsonData);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	return (
		<div className={`${theme} text-center`}>
			<main>
				<div className="text-[5rem] flex justify-between">
					<span className="text-black">Light Mode </span>
					<span className="text-white">Dark Mode</span>
				</div>
				<div className="flex justify-between">
					<button className="border text-black" onClick={(e) => setTheme("dark")}>
						Turn off the light
					</button>
					<button className="border text-white" onClick={(e) => setTheme("light")}>
						Turn on the light
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder=" Show me... "
						value={word}
						onChange={(e) => setWord(e.target.value)}
					/>
					<button type="submit" className="border">
						Search
					</button>
				</form>
				<div>{theme === "light" ? <Synonyms synonymsList={synonyms} /> : <p>bye</p>}</div>
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
