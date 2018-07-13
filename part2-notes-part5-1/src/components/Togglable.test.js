import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Note from './Note'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = shallow(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  it('renders its children', () => {
    expect(togglableComponent.contains(<div class="testDiv" />)).toEqual(true)
  })

  it('at start the children are not displayed', () => {
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking the button, children are displayed', () => {
    const button = togglableComponent.find('button')

    button.at(0).simulate('click')
    const div = togglableComponent.find('.togglableContent')
    expect(div.getElement().props.style).toEqual({ display: '' })
  })

})