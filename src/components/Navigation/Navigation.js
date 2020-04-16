import React from 'react'


const Navigation= ({onRouteChange})=>{

    return(
        //we dont want to run this function onRouteChange when rendered, so this way on click will only it will call
        <nav style={{display: 'flex', justifyContent: 'flex-end'}} onClick={()=>onRouteChange('SignIn')}>
        <p className='f3 link dim black underline pa3 pointer'>{`Sign out`}</p>
            
        </nav>
    );
}

export default Navigation;