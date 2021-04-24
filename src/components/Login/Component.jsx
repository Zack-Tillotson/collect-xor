import React, {useEffect} from 'react';
import cn from 'classnames'
import './component.scss'

import auth from '../../firebase/auth';

const divId = 'login-form'

function Component(props) {
  useEffect(() => {
    auth(`#${divId}`)
  }, [])

  return (
    <div className="login" id={divId} />
  )
}

export default Component;