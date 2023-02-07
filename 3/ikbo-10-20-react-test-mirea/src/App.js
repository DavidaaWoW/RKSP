import './App.css';
import {Header} from './components/Header';
import {Route, Routes} from "react-router-dom";
import {ClickCounter} from "./components/ClickCounter";
import {RGB} from "./components/RGB";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<ClickCounter />} />
                    <Route path="RGB" element={<RGB color="green" />}/>
                    <Route path="*" element={<ClickCounter />} />
                </Route>
            </Routes>
        </div>
    );
}


export default App;
