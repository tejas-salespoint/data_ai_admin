import { GET_INDUSTRIES } from '../../../../graphql/query/queries';
import { useQuery } from '@apollo/client';
import CreateButton from '../../../components/CreateButton';
import IndustryCard from './Card/Card';

const Industry = () => {
    const { loading, error, data ,refetch} = useQuery(GET_INDUSTRIES);

    if (loading) return "Loading...";
    if (error) return "Error";


    
    return (
        <>
        <div className="p-4 rounded-lg ">
            <div className='flex justify-between items-center mb-3'>
             <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Industry Landing</h2>
             <CreateButton link={'/create/industry'} />
            </div>
            <div className="grid grid-cols-4  gap-6">
                {data?.industries?.data?.map((item) => <IndustryCard key={item?.id} id={item?.id} refetch={refetch} /> )}
            </div>
        </div>

        
        </>
    );
}

export default Industry