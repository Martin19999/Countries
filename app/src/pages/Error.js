import { useLocation } from 'react-router-dom';
import '../styles/common.css';
import Search from "../components/Search.js";


const Error = () => {
    const location = useLocation();
    const { status } = location.state || {};
    const input = localStorage.getItem('input');

    return (
        <>
            <div className="fixed-container">
                <Search />
                {status === 'network-error'
                    ? <h2>Network error. Please check your internet connection.</h2>
                    : <h2>Ooops, the country "{input}" you are looking for does not seem to exist. Have you checked the spelling?</h2>}
                
            </div>
            <div className="scrollable-content">
                
            </div>


              
            {/* <div>
                {status === 'network-error'
                    ? <h2>Network error. Please check your internet connection.</h2>
                    : <h2>Ooops, the country "{input}" you are looking for does not seem to exist. Have you checked the spelling?</h2>}
            </div> */}
            
        </>
    )
}

export default Error;