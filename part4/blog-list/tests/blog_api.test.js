const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    
    await user.save()

    const userForToken = {
        username: user.username,
        id: user._id,
    }
    return token = jwt.sign(
        userForToken,
        process.env.SECRET
    )
})

describe('when there are initial blogs', () => {

    test('number of blogs', async () => {
        const response = await api.get('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('identifier by _id', async () => {
        const response = await api.get('/api/blogs')
            .set('Authorization', `bearer ${token}`)
        expect(response.body[0].id).toBeDefined()
        expect(response.body[0]._id).toBe(undefined)
    })
})

describe('creating and adding a new blog', () => {
    test('new blog', async () => {
        const newBlog = {
            title: 'abc1',
            author: 'gabi3',
            url: 'abc.com',
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsinDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            'abc1'
        )
    })

    test('blog has 0 likes', async () => {
        const newBlog = {
            title: 'aaa3',
            author: 'person1',
            url: 'whatever.com'
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsinDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const likes = blogsAtEnd.map(b => b.likes)
        expect(likes).toContain(0)
    })
    
    test('error 400 due to missing title', async () => {
        const newBlog = {
            author: 'person2',
            url: 'abc.com',
            likes: 42
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
    
    test('error 400 due to missing url', async () => {
        const newBlog = {
            title: 'woow',
            author: 'gabb',
            likes: 3
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })
})

describe('editing and deleting blogs', () => {

    test('deleting a blog', async () => {
        const newBlog = {
            title: 'idk',
            author: 'me',
            url: 'yo.com'
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsbefore = await helper.blogsinDb()
        const blogToDelete = await Blog.findById(response.body.id)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(200)

        const blogsafter = await helper.blogsinDb()
        expect(blogsafter).toHaveLength(
            blogsbefore.length-1
        )
        
        const contents = blogsafter.map(b => b.title)
        expect(contents).not.toContain(blogToDelete.content)
    })

    test('editing likes', async () => {
        const blogsAtStart = await helper.blogsinDb()
        const blogToMod = blogsAtStart[0]
        blogToMod.likes += 3

        await api
            .put(`/api/blogs/${blogToMod.id}`)
            .send(blogToMod)
            .set('Authorization', `bearer ${token}`)
            .expect(200)

        const blogsAfter = await helper.blogsinDb()
        const blogModified = blogsAfter[0]

        expect(blogModified.likes).toBe(blogToMod.likes)
    })

    test('editing title', async () => {
        const blogsAtStart = await helper.blogsinDb()
        const blogToMod = blogsAtStart[0]
        blogToMod.title = 'edit1'

        await api
            .put(`/api/blogs/${blogToMod.id}`)
            .set('Authorization', `bearer ${token}`)
            .send(blogToMod)
            .expect(200)

        const blogsAfter = await helper.blogsinDb()
        const blogModified = blogsAfter[0]
        expect(blogModified.title).toBe(blogToMod.title)
    })
})

describe('initially one database user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('creating username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'gabb3',
            name: 'gabi k3',
            password: 'secret1',    
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('username taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'gg2',
          name: 'gg',
          password: 'secret1',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('username must be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
      })
})

afterAll(() => {
    mongoose.connection.close()
})