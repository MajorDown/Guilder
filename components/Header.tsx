import React from 'react'
import AppLink from './AppLink';

const Header = () => {
  const mail = "romain.fouillaron@gmx.fr";
  const points = "6";

  return (
    <header>
      <div id="title">
        <h1>Guilder</h1>
        <img src="" alt="logo" />
      </div>
      <div id="headerNav">
        <div id="userOptions">
          <p>{mail}</p>
          <p>|</p>
          <p>{points} points</p>
          <p>|</p>
          <AppLink>Déconnexion</AppLink>
        </div>
        <nav id="operationNav">operationNav</nav>
      </div>
    </header>
  )
}

export default Header;