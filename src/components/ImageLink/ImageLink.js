import React from 'react';
import './ImageLink.css';

// const ImageLink= (props)=>{//using props directly
//with destructuring following way
  const ImageLink= ({onInputChange,onDetectSubmit})=>{
    return(
        <div>
 <p className='f3 tc'>
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          {/* <input className='f4 pa2 w-70 center' type='text'onChange={props.onInputChange}/>// using props directy */}
          <input className='f4 pa2 w-70 center' type='text'onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onDetectSubmit}
          
          >Detect</button>
        </div>
      </div>
        </div>
    );
}

export default ImageLink;