"use client";

import { useState } from "react";
import Synonyms from "./components/synonyms";
import Antonyms from "./components/antonyms";

const thesaurusKey = process.env.NEXT_PUBLIC_THESAURUS_KEY;

export default function Home() {
	const [word, setWord] = useState("");
	const [theme, setTheme] = useState("light");
	const [synonyms, setSynonyms] = useState([""]);
	const [antonyms, setAntonyms] = useState<any>(null);
	const [definition, setDefinition] = useState<any>(null);
	const [spellingMistakes, setSpellingMistakes] = useState<any>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${thesaurusKey}`
			);

			console.log(response);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			} else {
				console.log(response);
			}

			const jsonData = await response.json();

			console.log(jsonData);
			console.log(jsonData[0].meta.syns[0][1]);
			if (jsonData[0].meta) {
				setSynonyms(jsonData[0].meta.syns);
				setAntonyms(jsonData[0].meta.ants);
				setDefinition(jsonData[0].shortdef);
			} else {
				setSpellingMistakes(jsonData);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	return (
		<div className={`${theme} text-center p-[1rem]`}>
			<main className="">
				<div className="text-[8rem] flex justify-between">
					<span className="text-black">Light Mode</span>
					<span className="text-white">Dark Mode</span>
				</div>
				<div className="flex justify-between">
					<button
						className={`border border-black hover:bg-black rounded-full text-black p-[1rem] ${
							theme === "dark" ? "hover:text-black" : "hover:text-white"
						}`}
						onClick={(e) => setTheme("dark")}>
						Turn off the light
					</button>
					<button
						className={`border border-white hover:bg-white rounded-full text-white p-[1rem] hover:text-black ${
							theme === "light" ? "hover:text-white" : "hover:text-black"
						}`}
						onClick={(e) => setTheme("light")}>
						Turn on the light
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder=" Thesaurus search... "
						value={word}
						onChange={(e) => {
							setWord(e.target.value);
							console.log(word);
						}}
						className="flex border p-[1rem] w-[50%] m-auto mt-[1rem] text-center"
					/>
					<button type="submit" className="border p-[1rem] w-[50%] m-auto mt-[1rem] text-center">
						Search
					</button>
				</form>
				<div className="text-[3rem] p-[1rem]">{definition}</div>
				<div className="text-center">
					{theme === "light" ? <Synonyms synonymLists={synonyms} /> : <Antonyms antonymLists={antonyms} />}
				</div>
				{/* {spellingMistakes} */}
			</main>
		</div>
	);
}
