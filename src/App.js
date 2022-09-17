import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import './App.css';

function App() {

    return (
        <BrowserRouter>
            <>
                <Header />
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
            </>
        </BrowserRouter>


    );
}

export default App;
