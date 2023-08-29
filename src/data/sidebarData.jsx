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
]