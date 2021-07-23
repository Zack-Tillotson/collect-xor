import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import actions from 'state/actions'

const formSelector = state => state.addNewItemForm

function useNameLookup(formName = 'properties.name') {

  const form = useSelector(formSelector)
  const dispatch = useDispatch()
  const [games, updateGames] = useState([])

  const name = formName.split('.').reduce((value, path) => value[path], form)

  const lookupNames = () => {
  
    fetch(`https://api.geekdo.com/xmlapi2/search?type=boardgame&query=${name}`)
        .then(resp => resp.text())
        .then(stringData => {
          const xmlData = new DOMParser().parseFromString(stringData, "application/xml")

          const data = [...xmlData.documentElement.children].map(item => ({
            id: item.getAttribute('id'),
            name: item.children[0].getAttribute('value'),
            year: item.children[1].getAttribute('value'),
          }))

          updateGames(data)

          // const {title, publisher, image} = data.item_attributes
          // const updates = [
          //   {name: 'properties.name', value: title}, 
          //   {name: 'properties.publisher', value: publisher}, 
          //   {name: 'properties.canonicalImage', value: image},
          // ]
          
          // dispatch(actions.formValuesUpdated(updates))
        })
        .catch(err => {})
  }

  const lookupAttributes = (game) => {
    fetch(`https://api.geekdo.com/xmlapi2/thing?type=boardgame&id=${game.id}`)
      .then(resp => resp.text())
      .then(stringData => {
        const xmlData = new DOMParser().parseFromString(stringData, "application/xml")

        const item = [...xmlData.documentElement.children].find(ele => ele.tagName === 'item')
        const updates = [{
            name: 'properties.name',
            value: [...item.children].find(attr => attr.tagName === 'name' && attr.getAttribute('type') === 'primary').getAttribute('value'),
          }, {
            name: 'properties.releaseDate',
            value: [...item.children].find(attr => attr.tagName === 'yearpublished').getAttribute('value'),
          }, {
            name: 'properties.canonicalImage',
            value: [...item.children].find(attr => attr.tagName === 'image').innerHTML,
          }, {
            name: 'properties.publisher',
            value: [...item.children].find(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamepublisher').getAttribute('value'),
          }, {
            name: 'properties.designer',
            value: [...item.children].filter(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamedesigner').map(pub => pub.getAttribute('value')).join(', '),
          },
        ]

        dispatch(actions.formValuesUpdated(updates))
      })
      .catch(err => {})
  }

  return {
    lookupNames,
    lookupAttributes,
    games,
  }
}

export default useNameLookup