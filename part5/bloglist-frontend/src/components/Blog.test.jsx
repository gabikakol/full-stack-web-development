import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from  './Blog'

const blog = {
  title: 'Testing executed',
  author: 'author1',
  url: 'testing.com',
  likes: 23,
  user: {
    username: 'user1',
    name: 'User Test',
  }
}

const testUser = {
  username: 'user1',
  name: 'User Test'
}

test('content rendering', () => {

  render(<Blog blog = {blog} />)

  const title = screen.queryByText('Testing executed')
  expect(title).toBeDefined()

  const author = screen.queryByText('author1')
  expect(author).toBeDefined()

  const url = screen.queryByText('testing.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('23')
  expect(likes).toBeNull()
})

test('url and likes are shown', async () => {

  render(<Blog blog = {blog} user = {testUser} />)
  const user = userEvent.setup()
  const button = screen.queryByText('view')
  await user.click(button)

  const url = screen.queryByText('testing.com')
  expect(url).toBeDefined()

  const likes = screen.queryByText('23')
  expect(likes).toBeDefined()
})

test('event handler called when liked clicked', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog = {blog} user = {testUser}  updateLikes = {mockHandler}></Blog>)

  const user = userEvent.setup()
  const button = screen.queryByText('view')
  await user.click(button)

  const likeButton = screen.queryByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})