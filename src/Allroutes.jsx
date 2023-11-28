import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Forgetpassword from './components/Forgetpassword';
import Phase1 from './components/Phase1';
import Filldata from './components/Filldata';
import Phase2 from './components/Phase2';
import Signin from "./components/Signin"
import Singup from "./components/Siginup"
import Resetpassword from './components/Resetpassword';
import Otp from './components/Otp';
import Otpemail from './components/Otpemail';
import Companyscreen from "./components/Companyscreen"
import Agreement from './components/Agreement';
import Phase3 from './components/Phase3';
import Adddetails from './components/Adddetails';
import Settings from './components/Settings';
import Message from './components/Messagechatbox';
import Filldata2 from './components/Filldata2';
import Rejectpopup from './components/Rejectpopup';
import Filldataphase4 from './components/Filldataphase4';
import Congratspopup from './components/Congratspopup';
import Rejectedbyauthority from './components/Rejectedbyauthority';
import Approvedbyauthority from './components/Approvedbyauthority';
import FilldataAllphase from './components/FilldataAllphase';
import FilldataAllphases2 from './components/FilldataAllphases2';
import Congratsphase4 from './components/Congratsphase4';
import Submissionpopup from './components/Submissionpopup';
import Protected from './components/Protected';
import EmailVerify from './components/EmailVerify';
import Payment from './components/Payment';
import Phase4Page from './pages/Phase4Page';
import Phase4FilledDataPage from './pages/Phase4FilledDataPage';
import Accept from './components/Accept';
import OtpGroup from './components/OtpGroup';
import VerifyGroupEmail from './components/VerifyGroupEmail';
import SignupGroupClient from "./components/SignupGroupClient";
import GroupPhase1 from './components/GroupPhase1';
import GroupFilledData from './components/GroupFilledData';
import AgreementGroup from './components/AgreementGroup';
import RejectpopupGroup from './components/RejectPopupGroup';
import AuthorityToAct from './components/AuthorityToAct';
import AuthorityToAllow from './components/AuthorityToAllow';
import AuthorityToShare from './components/AuthorityToShare';
import GroupPhase2 from './components/GroupPhase2';
import GroupPhase3 from './components/GroupPhase3';
import Phase4GroupPage from './pages/Phase4GroupPage';
import Phase4FilledGroupPage from './pages/Phase4FilledGroupPage';

const Allroutes = () => {
  return (
    <Routes>
      <Route
        path="/adddetails/:applicationId"
        element={<Protected Component={Payment} />}
      />
      <Route path="/filldata" element={<Protected Component={Filldata} />} />
      <Route exact path="/" element={<Signin />} />
      <Route path="/signup" element={<Singup />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route
        path="/restpassword/:userId/:token"
        element={<Protected Component={Resetpassword} />}
      />
      <Route path="/:userId/verify/:token" element={<EmailVerify />} />
      <Route
        path="/companyscreen"
        element={<Protected Component={Companyscreen} />}
      />
      <Route path="/phase1" element={<Protected Component={Phase1} />} />
      <Route path="/phase2" element={<Protected Component={Phase2} />} />
      <Route path="/otpmail" element={<Otpemail />} />
      <Route path="/agreement" element={<Protected Component={Agreement} />} />
      <Route path="/phase3" element={<Protected Component={Phase3} />} />
      <Route path="/phase4" element={<Protected Component={Phase4Page} />} />
      <Route path="/setting" element={<Protected Component={Settings} />} />
      <Route path="/message" element={<Protected Component={Message} />} />
      <Route path="/reject" element={<Protected Component={Rejectpopup} />} />
      <Route path="/finaldata2" element={<Filldata2 />} />
      <Route path="/finaldataphase4" element={<Filldataphase4 />} />
      <Route
        path="/phase4/data"
        element={<Protected Component={Phase4FilledDataPage} />}
      />
      <Route path="/congrats" element={<Congratspopup />} />
      <Route path="/rejectbyauthority" element={<Rejectedbyauthority />} />
      <Route path="/Approvedbyauthority" element={<Approvedbyauthority />} />
      <Route path="/filldataallphase" element={<FilldataAllphase />} />
      <Route path="/filldataallphase2" element={<FilldataAllphases2 />} />
      <Route
        path="/congrats/phase4"
        element={<Protected Component={Congratsphase4} />}
      />
      <Route path="/submissionpopup" element={<Submissionpopup />} />
      <Route path="/accept" element={<Accept />} />

      {/* Group Client  */}
      <Route
        path="/groupclient/signup/:applicationId"
        element={<SignupGroupClient />}
      />
      <Route path="/group/otp/:applicationId" element={<OtpGroup />} />
      <Route
        path="/group/:userId/verify/:token/:applicationId"
        element={<VerifyGroupEmail />}
      />
      <Route
        path="/group/phase1"
        element={<Protected Component={GroupPhase1} />}
      />
      <Route
        path="/group/phase2"
        element={<Protected Component={GroupPhase2} />}
      />
      <Route
        path="/group/phase3"
        element={<Protected Component={GroupPhase3} />}
      />
      <Route
        path="/group/phase4"
        element={<Protected Component={Phase4GroupPage} />}
      />
      <Route
        path="/phase4/group/data"
        element={<Protected Component={Phase4FilledGroupPage} />}
      />
      <Route
        path="/group/agreement"
        element={<Protected Component={AgreementGroup} />}
      />
      <Route
        path="/authoritytoact"
        element={<Protected Component={AuthorityToAct} />}
      />
      <Route
        path="/authoritytoallow"
        element={<Protected Component={AuthorityToAllow} />}
      />
      <Route
        path="/authoritytoshare"
        element={<Protected Component={AuthorityToShare} />}
      />
      <Route
        path="/group/filldata"
        element={<Protected Component={GroupFilledData} />}
      />
      <Route
        path="/group/reject"
        element={<Protected Component={RejectpopupGroup} />}
      />
    </Routes>
  );
}

export default Allroutes