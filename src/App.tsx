import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <BrowserRouter basename="/nomaflix">
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/show/:category/:tvId" element={<Tv />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path="/search/movie/:movieId" element={<Search />} />
          <Route path="/search/tv/:tvId" element={<Search />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:category/:movieId" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
