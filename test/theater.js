import test from 'ava'
import request from 'supertest'
import app from '../app'
import faker from 'faker'
import mongoose from 'mongoose'
import util from '../util'

//Helpers
util.emptyDb()

//Customer tests

test('Get a list of customers', async t => {
  const customer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email()
  }

  const creation = await request(app)
    .post('/theater/customer')
    .send(customer)

  const res = await request(app).get('/theater/customer')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
})

test('Create a new customer', async t => {
  const customer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: faker.internet.email()
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 200)
  t.is(res.body.name, customer.name)
  t.is(res.body.email, customer.email)
})

test('Attempt to create a new customer with an empty field', async t => {
  const customer = {
    firstName: '',
    lastName: faker.name.findName(),
    email: ''
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 422)
})

test('Attempt to create a new customer with an invalid field', async t => {
  const customer = {
    firstName: 'Paquita',
    lastName: 'Salas',
    email: 'hola@'
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(res.status, 422)
})

test('Attempt to create duplicated customers', async t => {
  const customer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: 'hjgk@hotmail.com'
  }

  const res = await request(app)
    .post('/theater/customer')
    .send(customer)

  const dupCustomer = {
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    email: 'hjgk@hotmail.com'
  }

  const dupRes = await request(app)
    .post('/theater/customer')
    .send(dupCustomer)

  t.is(dupRes.status, 409)
})

//Seat tests

test('Get a list of seats', async t => {
  const seat = {
    number: 1,
    row: 12,
    movie: faker.random.word(),
    price: 8
  }

  const creation = await request(app)
    .post('/theater/seat')
    .send(seat)

  const res = await request(app).get('/theater/seat')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body), 'Body should be an array')
  t.true(res.body.length > 0)
})

test('Create a new seat', async t => {
  const seat = {
    number: 1,
    row: 20,
    movie: faker.random.word(),
    price: 8
  }

  const res = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(res.status, 200)
  t.is(res.body.number, seat.number)
  t.is(res.body.row, seat.row)
  t.is(res.body.movie, seat.movie)
})

test('Fetch a seat', async t => {
  t.plan(2)

  const seat = (await request(app)
    .post('/theater/seat')
    .send({
      number: 2,
      row: 18,
      movie: faker.random.word(),
      price: 8
    })).body

  const fetch = await request(app).get(`/theater/seat/detail/${seat._id}/json`)

  t.is(fetch.status, 200)
  t.deepEqual(fetch.body, seat)
})

test('Attempt to create duplicated seats', async t => {
  const seat = {
    number: 5,
    row: 10,
    movie: faker.random.word(),
    price: 8
  }

  const res = await request(app)
    .post('/theater/seat')
    .send(seat)

  const dupSeat = {
    number: 5,
    row: 10,
    movie: faker.random.word(),
    price: 8
  }

  const dupRes = await request(app)
    .post('/theater/seat')
    .send(dupSeat)

  t.is(dupRes.status, 409)
})

// Booking tests

test('Make a booking', async t => {
  t.plan(3)

  const seat = {
    number: 1,
    row: 15,
    movie: faker.random.word(),
    price: 8
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    firstName: 'Sara',
    lastName: 'Baras',
    email: faker.internet.email()
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  const customerId = customerRes.body._id
  const seatId = { seat: seatRes.body._id }

  const bookingRes = await request(app)
    .post(`/theater/customer/${customerId}/booking`)
    .send(seatId)

  t.is(bookingRes.status, 200)
})

test('Attempt to book a reserved seat', async t => {
  t.plan(3)

  const seat = {
    number: 8,
    row: 17,
    movie: 'La la land',
    price: 8,
    customer: new mongoose.Types.ObjectId('5962a5f37bde228394da6f72')
  }

  const seatRes = await request(app)
    .post('/theater/seat')
    .send(seat)

  t.is(seatRes.status, 200)

  const customer = {
    firstName: 'Ramona',
    lastName: 'López',
    email: faker.internet.email()
  }

  const customerRes = await request(app)
    .post('/theater/customer')
    .send(customer)

  t.is(customerRes.status, 200)

  const customerId = customerRes.body._id
  const seatId = { seat: seatRes.body._id }

  const bookingRes = await request(app)
    .post(`/theater/customer/${customerId}/booking`)
    .send(seatId)

  t.is(bookingRes.status, 409)
})

// test('Attempt to book an nonexistent seat', async t => {
//   t.plan(3)

//   unexSeatId = new mongoose.Types.ObjectId('5962a5f37bde228399da6f72')

//   const seatRes = await request(app)
//     .post('/theater/seat')
//     .send(seat)

//   console.log(seatRes.body)
//   t.is(seatRes.status, 200)

//   const customer = {
//     name: 'Ramona López',
//     email: faker.internet.email()
//   }

//   const customerRes = await request(app)
//     .post('/theater/customer')
//     .send(customer)
//   console.log(customerRes.body)

//   t.is(customerRes.status, 200)

//   const customerId = customerRes.body._id
//   const seatId = { seat: seatRes.body._id }
//   console.log(customerId)
//   console.log(seatId)

//   const bookingRes = await request(app)
//     .post(`/theater/customer/${customerId}/booking`)
//     .send(seatId)

//   t.is(bookingRes.status, 400)
// })
