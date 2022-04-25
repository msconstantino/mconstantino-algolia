import React from "react";
import { Routes, Route } from "react-router-dom";
import TableView from "./views/Table";
import MapView from "./views/Map";
import GlobeView from "./views/Globe";


function App() {
  return (
    <Routes>
      <Route path="/" exact element={<TableView />}></Route>
      <Route path="/map" exact element={<MapView />}></Route>
      <Route path="/globe" exact element={<GlobeView />}></Route>
    </Routes>
  );
}

export default App;