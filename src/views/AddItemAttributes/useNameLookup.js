import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import actions from 'state/actions'

import formSelector from 'state/selectors/form'

function getSafeValue(item, getter, defaultValue = '') {
  let value = defaultValue
  try {
    value = getter(item)
  } catch (e) {}
  return value
}

// lol bgg wut
function cleanText(text) {
  const ele = document.createElement('html')
  ele.innerHTML = text
  ele.innerHTML = ele.innerText
  return ele.innerText
}

function useNameLookup(formName = 'properties.name') {

  const form = useSelector(formSelector)
  const dispatch = useDispatch()
  const [games, updateGames] = useState([])

  const name = formName.split('.').reduce((value = {}, path) => value[path], form)

  const lookupNames = () => {
  
    fetch(`https://api.geekdo.com/xmlapi2/search?type=boardgame&query=${name}`)
        .then(resp => resp.text())
        .then(stringData => {
          const xmlData = new DOMParser().parseFromString(stringData, "application/xml")

          const data = [...xmlData.documentElement.children].map(item => {
            const nameEle = [...item.children].find(attr => attr.tagName === 'name')
            const yearEle = [...item.children].find(attr => attr.tagName === 'yearpublished')
            return {
              id: item.getAttribute('id'),
              name: nameEle && nameEle.getAttribute('value') || '',
              year: yearEle && yearEle.getAttribute('value') || '',
            }
          })

          updateGames(data)
        })
        .catch(err => {})
  }

  const lookupAttributes = (game) => {
    fetch(`https://api.geekdo.com/xmlapi2/thing?type=boardgame&id=${game.id}`)
      .then(resp => resp.text())
      .then(stringData => {
        const xmlData = new DOMParser().parseFromString(stringData, "application/xml")

        const item = [...xmlData.documentElement.children].find(ele => ele.tagName === 'item')

        const cleanDesc = cleanText(getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'description').innerHTML))
        

        const updates = [{
            name: 'properties.name',
            value: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'name' && attr.getAttribute('type') === 'primary').getAttribute('value')),
          }, {
            name: 'properties.releaseDate',
            value: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'yearpublished').getAttribute('value')),
          }, {
            name: 'properties.description',
            value: cleanDesc,
          }, {
            name: 'properties.canonicalImage',
            value: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'image').innerHTML),
          }, {
            name: 'properties.publisher',
            value: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamepublisher').getAttribute('value')),
          }, {
            name: 'properties.designer',
            value: getSafeValue(item, item => [...item.children].filter(attr => attr.tagName === 'link' && attr.getAttribute('type') === 'boardgamedesigner').map(pub => pub.getAttribute('value')).join(', ')),
          }, {
            name: 'properties.minPlayers',
            value: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'minplayers').getAttribute('value')),
          }, {
            name: 'properties.maxPlayers',
            value: getSafeValue(item, item => [...item.children].find(attr => attr.tagName === 'maxplayers').getAttribute('value')),
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