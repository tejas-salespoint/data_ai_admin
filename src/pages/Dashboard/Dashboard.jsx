import LayoutComponent from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndustryForm from "../Form/UpdatedForm/industryForm";
import SolutionPlaysForm from "../Form/IndustryPillerForm.jsx";
import UsecaseForm from "../Form/usecaseForm.jsx";
import Home from "../Home.jsx";
import Updateindsutry from "../UpdateForm/UpdateIndustryForm";
import UpdateUseCases from "../UpdateIndustry/UpdateUseCases.jsx";

import Industry from "../MainPages/Industry/Industry";
import IndustryPiller from "../MainPages/IndustryPiller/IndustryPiller";
import IndustryUseCases from "../MainPages/IndustryUseCases/IndustryUseCases";
import UpdateIndustryPillerForm from "../UpdateForm/UpdateIndustryPillerForm";
import UpdateIndustryUseCasesForm from "../UpdateForm/UpdateIndustryUseCasesForm";
import UpdateIndustryForm from "../UpdateForm/UpdateIndustryForm";



const Dashboard = () => {
  return (
      <Router>
          <div className="antialiased bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <Sidebar />
              <LayoutComponent>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/industry" element={<Industry />} />
                      <Route path="/industry_piller" element={<IndustryPiller />} />
                      <Route path="/indsutry_use_cases" element={<IndustryUseCases />} />
                      <Route path="/create/industry" element={<IndustryForm />} />

                      {/* updated routes */}
                      <Route path="/industry/create" element={<IndustryForm />} />
                      {/* updated routes  end */}

                      <Route path="/create/industry_piller" element={<SolutionPlaysForm />} />
                      <Route path="/create/industry_usecases" element={<UsecaseForm />} />
                      <Route path="/edit/industry_piller" element={<Updateindsutry />} />
                      <Route path="/edit/industry_usecases" element={<UpdateUseCases />} />
                      {/* <Route path="/edit/industry/form" element={<UpdateIndustryForm />} /> */}
                      <Route path="/edit/industry/form" element={<UpdateIndustryForm />} />
                      <Route path="/edit/industry_piller/form" element={<UpdateIndustryPillerForm />} />
                      <Route path="/edit/industry_usecases/form" element={<UpdateIndustryUseCasesForm />} />
                  </Routes>
              </LayoutComponent>
          </div>
      </Router>
  );
};

export default Dashboard;
