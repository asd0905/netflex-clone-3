import React from "react";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/movies/:movieId' element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
