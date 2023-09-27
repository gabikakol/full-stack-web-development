const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, entry) => {
        return sum + entry.likes
    }
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (largest, entry) => {
        return largest.likes > entry.likes 
            ? largest 
            : entry
    }
    return blogs.length === 0 
        ? 0 
        : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return 0
    const authorCount = lodash.countBy(blogs, 'author')
    maxAuthor = Object.keys(authorCount).reduce
                        ((a,b) => 
                            authorCount[a] > authorCount[b] 
                            ? a 
                            : b)
    return {
            author: maxAuthor,
            blogs: authorCount[maxAuthor]
        }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return 0
    var result = []
    blogs.reduce((res, value) => {
        if (!res[value.author]) {
            res[value.author] = {author: value.author, likes:0}
            result.push(res[value.author])
        }
        res[value.author].likes += value.likes
        return res
    }, {});
    return result[0]
}


module.exports = {
    dummy, 
    totalLikes, 
    favouriteBlog,
    mostBlogs,
    mostLikes
}