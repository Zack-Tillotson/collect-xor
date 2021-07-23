import React, {useState} from 'react';

import cn from 'classnames'
import {Link} from 'react-router-dom'

import useAuth from 'data/auth/useAuth'

import './component.scss'

import logoTitle from 'assets/bgshelf/headline-250x50.webp'
import logoTitleDark from 'assets/bgshelf/headline-dark-250x50.webp'

function Component(props) {
  const [isMenuOpen, updateIsMenuOpen] = useState(false)
  const {isLoggedIn, user, logout} = useAuth()

  const handleMenuToggleClick = event => {
    updateIsMenuOpen(!isMenuOpen)
    if(window.matchMedia("(max-width: 800px)").matches) {
      window.scrollTo(0,0)
    }
  }

  const handleMenuBackgroundClick = event => {
    updateIsMenuOpen(false)
  }

  const handleLogOutClick = event => {
    updateIsMenuOpen(false)
    logout()
  }

  return (
    <div className={cn(props.className, 'page-head')}>
      <div className="page-head__content page__container">
        <Link to="/app/" className="page-head__logo">
          <img src={logoTitleDark} alt="BG Shelf logo" className="page-head__logo-title-light" />
          <img src={logoTitle} alt="BG Shelf logo" className="page-head__logo-title-dark" />
        </Link>
        <div className="page-head__menu-container page-head-menu">
          <div className={cn('page-head-menu__background', {['page-head-menu__background--open']: isMenuOpen})} onClick={handleMenuBackgroundClick}> </div>
          <button className="page-head-menu__toggle --button-like" onClick={handleMenuToggleClick}>
            {isMenuOpen ? '✖' : '☰'}
          </button>
          <div className={cn('page-head-menu__menu', {['page-head-menu__menu--open']: isMenuOpen})}>
            {!!user && (
              <div>
                <h3>User</h3>
                {user.displayName && (<div className="page-head-menu__item">{user.displayName}</div>)}
                {user.email && (<div className="page-head-menu__item">{user.email}</div>)}
                <button className="page-head-menu__item" onClick={handleLogOutClick}>Log out</button>
                <hr />
              </div>
            )}
            <Link to="/about/" className="page-head-menu__item">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;