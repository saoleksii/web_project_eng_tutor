const admin_resolvers = require('./admin')
const booking_resolvers = require('./booking')
const user_resolvers = require('./user')

module.exports = [admin_resolvers, booking_resolvers, user_resolvers]