import React from 'react';

import './styles.css';

const Header = () => (
    <header id="main-header">JSHunt</header>
); 
// ou Header = () => { return (); } 
/* ou class Header extends Component { // utilizar assim quando for mexer com "State"
    render() {
        return <h1>Hello</h1>
    }
}*/

export default Header;