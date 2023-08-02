import PillerCard from "../../components/PillerCard.jsx";

function Updateindsutry() {
    return (
        <div className="p-4  border-dashed rounded-lg dark:border-gray-700 ">
            <span>Edit Industry Piller</span>
            <h3 className="text-2xl font-semibold text-blue ">Manufacturing and Mobility Industry</h3>
            <div className="grid grid-cols-4 grid-rows-3 gap-6 p-4 ">
               <PillerCard title={'Energy resillient information'} subtitle={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum tortor ac metus dapibus, vel luctus nisl bibendum. Donec euismod eros nec dolor imperdiet, quis aliquet orci laoreet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit nibh ac orci dignissim, vel tincidunt quam porttitor. Praesent felis nisi, malesuada id comm'} />
            </div>
        </div>
    );
}

export default Updateindsutry;