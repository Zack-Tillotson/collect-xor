import React from 'react';

import cn from 'classnames'
import {Link} from 'react-router-dom'

import './component.scss'
import logoTitle from 'assets/bgshelf/headline-250x50.webp'
import logoTitleDark from 'assets/bgshelf/headline-dark-250x50.webp'

function Component(props) {
  return (
    <div className={cn(props.className, 'page-head')}>
      <div className="page-head__content page__container">
        <Link to="/app/">
          <img src={logoTitleDark} alt="BG Shelf logo" className="page-head__logo-title-light" />
          <img src={logoTitle} alt="BG Shelf logo" className="page-head__logo-title-dark" />
        </Link>
      </div>
    </div>
  );
}

export default Component;