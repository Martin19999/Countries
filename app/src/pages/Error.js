import { useLocation } from 'react-router-dom';

const Error = () => {
    const location = useLocation();
    const { status } = location.state || {};

    return (
        <>
            
            <div>
                {status === 'network-error'
                    ? <p>Network error. Please check your internet connection.</p>
                    : <p>Ooops, the country you are looking for does not exist.</p>}
            </div>
            
        </>
    )
}

export default Error;