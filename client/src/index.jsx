import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { getSalePrice, toPascalCase } from './gameDataHelpers';
import GameAddOns from './components/GameAddOns.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dlcs: []
    }
  }

  componentDidMount() {
    // If props.gameID not given, randomly generates a game id between 1-100
    var id;
    this.props.gameid !== '' ? id = this.props.gameid : id = Math.floor(Math.random() * 9999999);
    // id = window.location.pathname;
    // if (id.length === 1) { id = '2' }
    // else { id = id.slice(1,1) }
    // console.log(id);
    $.get(`http://localhost:3003/games/${id}`, (data) => {
      this.setState({
        franchiseBool: data.franchise,
        gameName: toPascalCase(data.game_name),
        price: data.original_price,
        saleBool: data.sale_boolean, // Shows % off elements
        saleCountdownBool: data.sale_countdown_boolean, // If special sale
        salePercent: data.sale_percentage,
        salePrice: getSalePrice(data.original_price, data.sale_percentage),
        os: data.os, // TODO find better mac logo
      });
    });
    $.get(`http://localhost:3003/dlcs`, (data) => {
      this.setState({
        dlcData: data
      })
    })
  }

  // TODO on mouseHover for franchise banner
  // onMouseEnter={} onMouseLeave={}

  render() {
    // let data = [];
    // for (let key of Object.keys(this.state)) {
    //   data.push(<div>`{key}: {JSON.stringify(this.state[key])}`</div>);
    // }
    // const tempDataStyle = {
    //   display: 'flex',
    //   flexDirection: 'column'
    // }

    // const gridContainer = {
    //   display: 'grid',
    //   gridTemplateColumns: '65% auto'
    // };

    // const col1 = {
    //   gridColumnStart: '1',
    //   gridColumnEnd: '2',
    // };

    // const col2 = {
    //   gridColumnStart: '2'
    // };

    const franchiseBannerStyle = {
      display: 'block',
      height: '54px',
      background: '#363a43',
      boxShadow: 'inset 0 0 10px rgba(255,255,255,1)',
      borderRadius: '6px'
    };

    const franchiseTextStyle = {
      height: '38px',
      paddingTop: '16px',
      paddingLeft: '16px',
      color: '#ffffff',
      fontSize: '16px',
      fontFamily: '"Motiva Sans", Sans-serif',
      fontWeight: '300',
      textShadow: '1px 1px rgba(0, 0, 0, 0.5)',
    };

    const gamePurchaseBannerStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(97, 100, 101, 0.3) 0%, rgba(226, 244, 255, 0.3) 100%)',
      padding: '16px 16px 26px 16px',
      marginTop: '16px',
    };

    const gamePurchaseTextStyle = {
      color: '#ffffff',
      fontSize: '21px',
      fontFamily: '"Motiva Sans", Sans-serif',
      marginBlockStart: '0.67em',
      marginBlockEnd: '0.67em',
      marginInlineStart: '0px',
      marginInlineEnd: '0px',
      fontWeight: '300'
    };

    const gamePurchaseOSStyle = {
      height: '18px',
      display: 'flex'
    };

    const eachLogoStyle = {
      height: '40px',
      width: '35px'
    };

    let osLogos = [];
    if (this.state.dlcData !== undefined) {
      for (let dlc of this.state.dlcData) {
        osLogos.push(<img src={dlc.images} alt='OS logo' style={eachLogoStyle}></img>);
      }
    }

    const footerStyle = {
      display: 'flex',
      justifyContent: 'flex-end',
      height: '40px',
      // position: 'relative'
    };

    const costCartDivStyle = {
      background: '#000000',
      borderRadius: '2px',
      height: '100%',
      display: 'inline-flex',
      lineHeight: '14px',
      margin: '10px',
      position: 'relative',
      top: '-23px',
      left: '-4px',
      zIndex: '5'
    };

    const costStyle = {
      background: 'transparent',
      color: '#dbe2e6',
      fontSize: '13px',
      fontFamily: '"Motiva Sans", Sans-serif',
      fontWeight: '100',
      height: '85%',
      margin: '15px'
    };

    const cartButtonStyle = {
      background: 'linear-gradient( to bottom, rgba(121,153,5,1) 5%, rgba(83,105,4,1) 95%)',
      borderColor: 'transparent',
      color: '#c6d4df',
      fontSize: '15px',
      fontFamily: '"Motiva Sans", Sans-serif',
      margin: '3px',
      padding: '0 15px'
    };

    return (
      <div>
      {/* <div style={gridContainer}> */}
      {/*   <div style={col1}> */}
          {/* Franchise Banner - rendered if this.state bool is true*/}
          { this.state.franchiseBool &&
          <div style={franchiseBannerStyle}>
            <div style={franchiseTextStyle}>
              Check out the entire {this.state.gameName} Franchise on Steam
            </div>
          </div>
          }
          {/* Game Purchase Options */}
          <div style={gamePurchaseBannerStyle}>
            <h1 style={gamePurchaseTextStyle}>Buy {this.state.gameName}</h1>
            <div style={gamePurchaseOSStyle}>
              {osLogos}
            </div>
          </div>
          {/* Price and Add to cart buttons */}
          <div style={footerStyle}>
            <div style={costCartDivStyle}>
              <h2 style={costStyle}>{'$'+ this.state.price}</h2>
              <button style={cartButtonStyle}>Add to Cart</button>
            </div>
          </div>
          {/* DLC Options */}
          { (this.state.dlcCount >= 1) &&
          < GameAddOns dlcs={this.state.dlcData}/>
          }
          {/* Data */}
          {/* <div style={tempDataStyle}>{data}</div> */}
        {/* </div> */}
        {/* <div style={col2}></div> */}
      {/* </div> */}
      </div>
    )
  }
};

ReactDOM.render(< App gameid={''}/>, document.getElementById('purchase') || document.createElement('div')); // createElement for testing purposes

export default App;

// TODO breakout franchise module
// TODO franchise module react on hover

// TODO breakout main game module
// TODO cart button react on hover
// TODO countdown if bool = true
// TODO sale module if bool = true

// TODO include propTypes https://reactjs.org/docs/typechecking-with-proptypes.html