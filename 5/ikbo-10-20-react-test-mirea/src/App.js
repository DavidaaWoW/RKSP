import './App.css';
import {Header} from './components/Header';
import {Route, Routes} from "react-router-dom";
import {ClickCounter} from "./components/ClickCounter";
import {RGB} from "./components/RGB";
import Dialogs from "./components/Dialogs";
import {DialogItem} from "./components/DialogItem";
import Form from "./components/Form";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<ClickCounter />} />
                    <Route path="RGB" element={<RGB color="green" />}/>
                    <Route path="chat" element={<Dialogs />} />
                    <Route path="dialogItem/:username" element={<DialogItem />} />
                    <Route path="agreement" element={<Form />} />
                    <Route path="*" element={<ClickCounter />} />
                </Route>
            </Routes>
        </div>
    );
}


export default App;
