```
// Run
const container = { first_name: "", last_name: "", phone_number: "", email: "" }, 
  strs = [
    "Marilyn 234.324.1492",
    "@ Contact 123-141-1499",
    "Marilyn",
    "Plato Morales",
    "Contact Marilyn at (324) 1414.1444"
  ];

strs.forEach(str => {
	const match = runParser(container, str);
	console.log(match)
});


// get back
{
  first_name: 'Marilyn',
  last_name: '',
  phone_number: '234.324.1492',
  email: '',
  original: 'Marilyn 234.324.1492'
}
{
  first_name: '',
  last_name: '',
  phone_number: '123-141-1499',
  email: '',
  original: '@ Contact 123-141-1499'
}
{
  first_name: 'Marilyn',
  last_name: '',
  phone_number: '',
  email: '',
  original: 'Marilyn'
}
{
  first_name: 'Plato',
  last_name: 'Morales',
  phone_number: '',
  email: '',
  original: 'Plato Morales'
}
{
  first_name: 'Marilyn',
  last_name: '',
  phone_number: '(324) 1414.1444',
  email: '',
  original: 'Contact Marilyn at (324) 1414.1444'
}
```