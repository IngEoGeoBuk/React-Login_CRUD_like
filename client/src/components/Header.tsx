import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from './Header.styles';

const Header = () => {

    return (
        <Container>
            <header>
                <h2>FIFA</h2>
                <nav>
                    <ul>
                        <li><Link to='/' className="LinkStyles">Home</Link></li>
                        <li><Link to='/createTeam' className="LinkStyles">Team</Link></li>
                        <li><Link to='/best' className="LinkStyles">Best</Link></li>
                    </ul>
                </nav>
            </header>
        </Container>

    )
}

export default Header
