import { FaHome, FaHouseUser, FaIndustry, FaSearchengin } from "react-icons/fa";

export const sidebarData = [
    {
        title: "Home",
        link: "/",
        icon: <FaHome size={20} color="dark-grey"/>,
    },
    
    {
        title: "Industry",
        link: "/industry",
        icon: <FaIndustry size={20}/>,
    },
    
    {
        title: "Pillers",
        link: "/industry_piller",
        icon: <FaSearchengin size={20}/>,
    },
    
    {
        title: "Use Cases",
        link: "/indsutry_use_cases",
        icon: <FaHouseUser size={20}/>,
    },
    
    
    {
        title: "Industry",
        link: "/create/industry",
        icon: "",
    }, {
        title: "Industry Pillers",
        link: "/create/industry_piller",
        icon: "",
    }, {
        title: "Industry Use Cases",
        link: "/create/industry_usecases",
        icon: "",
    }, {
        title: "Update Industry Form",
        link: "/edit/industry/form",
        icon: "",
    },{
        title: " Edit Industry Piller",
        link: "/edit/industry_piller",
        icon: "",
    },{
        title: "Edit Industry Usecases",
        link: "/edit/industry_usecases",
        icon: "",
    },
]