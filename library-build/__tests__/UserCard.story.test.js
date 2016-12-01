
import React from 'react'
import renderer from 'react-test-renderer'
import story from '../../docs/src/UserCard/UserCard.story.js'
import { Story } from 'react-library'

jest.useFakeTimers()

const stories = story.stories.filter(s => !s.skipTest)
stories
  .forEach(s => {
    if (s.sequence) {
      const Component = story.type
      let props = Story.getSequenceInitialProps(s)
      let ref
      const node = renderer.create(<Component {...props} ref={_ref => (ref = _ref)} />)
      s.sequence.forEach(async function(step, i) {
        it(`UserCard.story - ${s.title} - ${step.title}`, async () => {
          if (i > 0) {
            const result = Story.getSequenceStepProps(ref, s, i, props)
            jest.runAllTimers()
            props = await result
            node.update(<Component {...props} ref={_ref => (ref = _ref)} />)
          }
          const tree = node.toJSON()
          expect(tree).toMatchSnapshot()
          expect(story.popHandleCalls()).toMatchSnapshot()
        })
      })
    } else {
      let node
      if (React.isValidElement(s.content)) {
        node = s.content
      } else {
        const Component = story.type
        node = <Component {...s.content} />
      }
      it(`UserCard.story - ${s.title}`, () => {
        expect(renderer.create(node)).toMatchSnapshot()
      })
    }
  })
  if (stories.length === 0) {
    it(`UserCard.story - No stories`, () => {
    });
  }
