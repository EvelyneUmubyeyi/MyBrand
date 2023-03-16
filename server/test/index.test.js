const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../index')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)
dotenv.config({ path: '.env.test' })

describe('API tests', () => {

    // before(() => {
    //     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    //     const db = mongoose.connection
    //     db.on('error', console.error.bind(console, "Database connection failed"))
    //     db.once('open', () => {
    //         console.log('connected to the database successfully')
    //     })
    // })

    describe('Test API default route', () => {
        it('It should return a welcome string', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    const actualValue = res.body.message
                    expect(actualValue).to.be.equal('Welcome to Umubyeyi Evelyne portolio API')
                    done()
                })
        })
    })

    describe('Getting all blogs', () => {
        it('should return all blogs', (done) => {
            chai
                .request(app)
                .get('/blogs/')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.should.be.a('object')
                    done()
                })
        })
    })

    describe('Creating, retrieving and deleting a single blog by id', () => {
        it('should create a new blog, retrieve it and delete it using its id', (done) => {
            const user = {
                email: 'umubyeyi@gmail.com',
                password: '123'
            }

            const blog = {
                title: "How I became a better programmer",
                hook: "Things you can do to become a better programmer",
                image: "https://res.cloudinary.com/doxc03jzw/image/upload/v1677490243/fvdnihb3o2mek2lnnxhe.jpg",
                body: "Lorem ipsum",
                author_name: "Evelyne Umubyeyi",
                author_image: "https://res.cloudinary.com/doxc03jzw/image/upload/v1677490243/fvdnihb3o2mek2lnnxhe.jpg",
            }
            chai
                .request(app)
                .post('/users/auth/')
                .send(user)
                .end(async (err, response) => {
                    response.should.have.status(200)
                    const token = response.header.authenticate
                    await chai
                        .request(app)
                        .post('/blogs/')
                        .set({ Authorization: `Bearer ${token}` })
                        .send(blog)
                        .then(async (res) => {
                            res.should.have.status(201)
                            const blog = res.body.data
                            const response = await chai
                                .request('app')
                                .get(`/blogs/${blog._id}/`)
                                response.should.have.status(200)
                                response.body.should.be.a('object')
                                response.body.should.have.property('message').equal('Single blog')
                                response.body.should.have.property('data').should.be.a('object')
                                response.body.should.have.property('data').have.nested.property('_id').equal(blog._id)
                                  const deleteResponse = await chai
                                        .request(app)
                                        .delete(`/blogs/${blog._id}/`)
                                        .set({ Authorization: `Bearer ${token}` })
                                        deleteResponse.should.have.status(200)
                                        deleteResponse.body.should.be.a('object')
                                        deleteResponse.body.should.have.property('message').equal('Blog deleted')
                                        deleteResponse.body.should.have.property('data').have.nested.property('_id').equal(blog._id)
                        })
                    done()
                })
                done()
        })
    })

})