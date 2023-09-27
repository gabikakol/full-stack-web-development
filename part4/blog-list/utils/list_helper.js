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

module.exports = {
    dummy, 
    totalLikes
}