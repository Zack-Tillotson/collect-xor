import React from 'react';
import cn from 'classnames'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import actions from 'state/actions'

import './component.scss'

const steps = [{
  url: "/app/add/barcode/",
  label: 'Barcode',
}, {
  url: "/app/add/attributes/",
  label: 'Attributes',
}, {
  url: "/app/add/review/",
  label: 'Review',
}, ]

function Component(props) {

  const {location} = props
  let isBeforeActive = true

  return (
    <div className={cn('form-breadcrumbs', props.className)}>
      {steps.map(step => {
        const isActive = location.pathname === step.url

        const ret = (
          <Link 
            key={step.url}
            to={step.url} 
            className={cn('form-breadcrumbs__step', {
              ['form-breadcrumbs__step--active']: isActive,
              ['form-breadcrumbs__step--complete']: !isActive && isBeforeActive,
            })}>
              {step.label}
          </Link>
        )

        isBeforeActive = isBeforeActive && !isActive

        return ret
      })}
    </div>
  )
}

export default Component;