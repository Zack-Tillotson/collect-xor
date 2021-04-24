import React, {useEffect} from 'react';
import cn from 'classnames'
import './component.scss'

import {init} from 'data/auth';

const divId = 'login-form'

function Component(props) {
  useEffect(() => {
    init(`#${divId}`)
  }, [])

  return (
    <div className="login" id={divId} />
  )
}

export default Component;