import React from 'react'


const Navigation = ({ onRouteChange, isSignedIn }) => {

    if (isSignedIn) {
        return (
            //we dont want to run this function onRouteChange when rendered, so this way on click will only it will call
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('SignIn')}>{`Sign out`}</p>
            </nav>
        );
    }
    else   {
        return <div></div>
    }

}

export default Navigation;