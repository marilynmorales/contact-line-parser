'use strict';

const strs = [
	"Marilyn 234.324.1492",
	"@ Contact 123-141-1499",
	"Marilyn",
	"Plato Morales",
	"Contact Marilyn at (324) 1414.1444"
];

const pattern_lib = [
	{
		name: "Name Only",
		pattern: /(?<first_name>^\w+?)(?<last_name>\s+\w+)?$/,
	}, 
	{
		name: "Phone Number Only",
		pattern: /(?<phone_number>^\(?\d+\)?\s?\-?\.?\d+\s?\.?\-?\d+)$/
	},
	{
		name: "Name Phone Number Only",
		pattern: /(?<first_name>^\w+?)(?<last_name>\s+\w+)?(?<phone_number>\s+?\(?\d+\)?\s?\-?\.?\d+\s?\.?\-?\d+)$/,
	}, 
];

function sanitizeValue(type, str) {
	str = str.trim();
	if(type === "email") {
		return str.toLowerCase();
	}
	let names = ["first_name", "last_name"].findIndex(k => k === type);
	if(names > -1) {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}
	return str;
}

function getNormalizedString(str) {
	return str.toLowerCase().replace(/contact\s|\s?@\s?|email\s|reach\s|\sor\s|\sat\s/g, " ").trim();
}

function getFieldByPattern(pattern, str, container, strParser) {
	const str_normalized = getNormalizedString(str);
	let parsed_str = strParser ? strParser(str_normalized) : str_normalized,
			match = parsed_str.match(pattern);
	if(match && match.groups) {
		for(let type in container) {
			if(container.hasOwnProperty(type)) {
				let name = match.groups[type] ? match.groups[type] : "";
				container[type] = sanitizeValue(type, name);
			}
		}
		container.original = str;
		return container;
	}
	return null;
}

function runParser(container, str) {
	let match = null;
	for(let matching of pattern_lib) {
		const { pattern, parser } = matching;
		match = getFieldByPattern(pattern, str, container, parser);
		if(match) break;
	}
	return match;
}

const container = {
	first_name: "",
	last_name: "",
	phone_number: "",
	email: ""
}

strs.forEach(str => {
	const match = runParser(container, str);
	console.log(match)
});

