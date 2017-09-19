import {fulfillField} from '../../src/util/fulfillField'

test('fulfillField : happy path', () => {
    const status  = 'status1'
    const id  = 'id2'

    const result = fulfillField({status, id})
    expect(result).toBe(JSON.stringify({status, id}))
})

test('fulfillField : happy path', () => {
    const status  = 'status1'
    const id  = ''

    const result = fulfillField({status, id})
    expect(result).toBe(JSON.stringify({status}))
})


test('fulfillField : happy path', () => {
    const status  = null
    const id  = ''

    const result = fulfillField({status, id})
    expect(result).toBe(JSON.stringify({}))
})