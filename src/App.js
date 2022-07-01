import React from "react";
import { Table, Tbody, Td, Text, Th, Thead, Tr, Box, Input, Button, Stack, Center } from "@chakra-ui/react";

const WeatherContext = React.createContext({
	city: [],
	addCity: (name, temprature) => { },
});

const CityList = (props) =>{
	const context = React.useContext(WeatherContext);
	return(
		<>
			<Table>
				<Thead>
					<Tr>
						<Th>City</Th>
						<Th>Temprature</Th>
					</Tr>
				</Thead>
				<Tbody>
					{context.city.map((cities, i) => (
						<Tr key={cities.name}>
							<Td>{cities.name}</Td>
							<Td>{cities.temprature} </Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</>
	)
}

const TempAverage = (props) =>{
	const context = React.useContext(WeatherContext);

	if (context.cities.length === 0){
		return(
			<Box alignItems='center' justifyContent='center' w='100%' h='100%' mt='1rem' >
				<Box>
					<Text textAlign='center'>Add some cities to view their average tempratures</Text>
				</Box>
			</Box>
		);
	}

	let total = 0;
	for (const city of context.city){
		total += city.temprature;
	}
	const avg = total / context.city.length;
	
	return(
		<Box alignItems='center' justifyContent='center' w='100%' h='100%' mt='1rem' >
			<Box>
				<Text textAlign='center'>The average is <b>{avg.toFixed(2)}</b> degrees Fahrenheit.</Text>
			</Box>
		</Box>
	)
}

const AddCityBtn = (props) =>{
	const context = React.useContext(WeatherContext);

	const [name, setName] = React.useState('');
	const submit = ()=> {
		context.addCity(name, Math.ceil(Math.random() * 10));
		setName('');
	}

	return (
		<form>
			<Input placeholder="Enter a city name" value={name} onChange={(e) => setName(e.target.value)} />
			<Button onClick={submit} borderRadius='8px' mt='1rem' >Add</Button>
		</form>
	)

}

function App() {
	const [city, setCity] = React.useState([]);

	const addCity=(name, temprature)=>{
		setCity(prevCity => [...prevCity, { name, temprature}]);
	}
	return (
		<>
			
			<Box w='100%' h='100vh' alignItems='center !important' justifyContent='center !important'>
				<WeatherContext.Provider value={{city, addCity}}>
					<Stack w='45vw' minH='50vh' alignItems='center !important' m='auto' mt='7rem' spacing={3} justifyContent='center !important' boxShadow='sm' bg='gray.50' borderRadius='8px' >
						<Text as='h2' fontWeight='700' fontSize='2em' >Weather App</Text>
						<Center>					
							<CityList/>
						</Center>
						{/* <TempAverage/> */}
						<AddCityBtn/>
					</Stack>
					
				</WeatherContext.Provider>
			</Box>
		</>
	);
}

export default App;
