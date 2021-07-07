import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import cn from 'classnames'

import PageHead from '../PageHead'

import './component.scss'

function Component(props) {
  const {
    isHeadShown = true,
  } = props;

  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="page">
      {isHeadShown && (
        <PageHead className="page__head" />
      )}
      <div className={cn('page__content', 'page__container', props.className)}>
        {props.children}
      </div>
      <div className="page__foot">
        <div className="page__container">
          <a href="https://zacherytillotson.com">© Zack Tillotson</a>
        </div>
      </div>
    </div>
  );
}

export default Component;