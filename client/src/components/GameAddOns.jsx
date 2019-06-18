import React from 'react';
import { getTotalCost } from '../gameDataHelpers';
import DLC from './DLC.jsx';

let GameAddOns = (props) => {
  const moduleStyle = {
    display: 'block',
    paddingTop: '20px',
    paddingBottom: '20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const titleStyle = {
    color: '#ffffff',
    letterSpacing: '2px',
    fontSize: '15px',
    fontFamily: '"Motiva Sans", Sans-serif',
    fontWeight: '100'
  };

  const browseButtonStyle = {
    color: '#ffffff',
    fontSize: '11px',
    fontFamily: '"Motiva Sans", Sans-serif',
    border: '1px solid rgba(255,255,255,0.4)',
    borderRadius: '2px',
    padding: '0 20px',
    background: 'transparent',
    position: 'relative',
    left: '-2px'
  };

  let dlcs = [];
  for (let item of props.dlcs) {
    console.log(item);
    dlcs.push(< DLC key={item.dlc_name} content={item}/>);
  }

  const total = getTotalCost(props.dlcs);

  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '40px'
  };

  const costCartDivStyle = {
    background: '#000000',
    borderRadius: '2px',
    height: '100%',
    display: 'inline-flex',
    lineHeight: '14px'
  };

  const costStyle = {
    background: 'transparent',
    color: '#dbe2e6',
    fontSize: '13px',
    fontFamily: '"Motiva Sans", Sans-serif',
    fontWeight: '100',
    height: '100%',
    margin: '15px'
  };

  const cartButtonStyle = {
    background: 'linear-gradient( to bottom, rgba(121,153,5,1) 5%, rgba(83,105,4,1) 95%)',
    height: '85%',
    borderColor: 'transparent',
    color: '#c6d4df',
    fontSize: '15px',
    fontFamily: '"Motiva Sans", Sans-serif',
    margin: '3px',
    padding: '0 15px'
  };

  return (
    <div style={moduleStyle}>
      <div style={headerStyle}>
        {/* content h2 and browse button */}
        <h1 style={titleStyle}>CONTENT FOR THIS GAME</h1>
        <button style={browseButtonStyle}> Browse all ({props.dlcs.length})</button>
      </div>
      <div>
        {/* map dlcs */}
        {dlcs}
      </div>
      <div style={footerStyle}>
        {/* Price and Add to cart buttons */}
        <div style={costCartDivStyle}>
          <h2 style={costStyle}>{total}</h2>
          <button style={cartButtonStyle}>Add all DLC to Cart</button>
        </div>
      </div>
    </div>
  )
};

export default GameAddOns;

// TODO Browse button vertical spacing
// TODO Browse button react on hover
// TODO Cart button react on hover