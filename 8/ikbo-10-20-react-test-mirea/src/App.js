import './App.css';
import {Header} from './components/Header';
import {Route, Routes} from "react-router-dom";
import {ClickCounter} from "./components/ClickCounter";
import {RGB} from "./components/RGB";
import Dialogs from "./components/Dialogs";
import {DialogItem} from "./components/DialogItem";
import Form from "./components/Form";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import {RequireAuth} from "react-auth-kit";
import Tasks from "./components/Tasks";
import Logout from "./components/Logout";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<ClickCounter />} />
                    <Route path="RGB" element={<RGB color="green" />}/>
                    <Route path="chat" element={
                        <RequireAuth loginPath={'/login'}>
                            <Dialogs />
                        </RequireAuth>
                        } />
                    <Route path="tasks" element={
                        <RequireAuth loginPath={'/login'}>
                            <Tasks />
                        </RequireAuth>
                    } />
                    <Route path="dialogItem/:username" element={<DialogItem />} />
                    <Route path="agreement" element={<Form />} />
                    <Route path="register" element={<RegisterForm /> } />
                    <Route path="login" element={<LoginForm /> } />
                    <Route path="logout" element={<Logout /> } />
                    <Route path="*" element={<ClickCounter />} />
                </Route>
            </Routes>
        </div>
    );
}


export default App;
