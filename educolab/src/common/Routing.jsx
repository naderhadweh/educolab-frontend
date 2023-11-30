import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from '../LandingPage.jsx';
import InstructionsPage from "../InstructionsPage.jsx";
import HomePage from "../HomePage.jsx";
import GroupsView from "../UserViews/GroupsView.jsx";
import DatosProfile from "../UserViews/DatosProfile.jsx";
import LogInPage from "../LogInPage.jsx";
import SignUpPage from "../SignUpPage.jsx";
import UserCheck from "../protected/UserCheck.jsx"
import AdminCheck from "../protected/AdminCheck.jsx";
import LogoutButton from "../LogoutButton.jsx";
import CrearGrupo from "../Creaciones/CrearGrupo.jsx";
import RequestsView from "../UserViews/RequestsView.jsx";
import VerParticipantesGroups from "../UserViews/VerParticipantesGroups.jsx";
import VerCompaneros from "../UserViews/VerCompaneros.jsx";
import CrearReview from "../Creaciones/CrearReview.jsx";
import VerReviews from "../UserViews/VerReviews.jsx";
import ChatComponent from "../UserViews/Chat.jsx";

function Routing(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/landing_page'} element={<LandingPage/>}/>
                <Route path={'/login'} element={<LogInPage/>}/>
                <Route path={'/signup'} element={<SignUpPage/>}/>
                <Route path={'/instructions_page'} element={<InstructionsPage/>}/>
                <Route path={'/home_page'} element={<HomePage/>}/>
                <Route path={'/'} element={<LandingPage/>}/>
                <Route path={'/ver_grupos'} element={<GroupsView/>}/>
                <Route path={'/mis_datos'} element={<DatosProfile/>}/>
                <Route path={'/user_check'} element={<UserCheck/>}/>
                <Route path={'/admin_check'} element={<AdminCheck/>}/>
                <Route path={'/logout'} element={<LogoutButton/>}/>
                <Route path={'/crear_grupo'} element={<CrearGrupo/>}/>
                <Route path={'/ver_requests'} element={<RequestsView/>}/>
                <Route path={'/ver_participantes'} element={<VerParticipantesGroups/>}/>
                <Route path={'/ver_companeros'} element={<VerCompaneros/>}/>
                <Route path={'/crear_review'} element={<CrearReview/>}/>
                <Route path={'/ver_reviews'} element={<VerReviews/>}/>
                <Route path={'/chat'} element={<ChatComponent/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default Routing