import {initDB, videoCreate, videoList, videoDetail} from '../../src/module/database'

describe('mongoose module', () => {
  
  let videoId = ''

  it('initDB', (done) => {
    //* username, password, url should be hidden as env variable
    initDB()
    expect(typeof global.DBInstance).toBe('object')
    done()
  })

  it.skip('videoCreate()', (done) => {
    const payload = {
      fbId: 'perterObjId',
      title: 'perter title',
      description: 'perter description',
      source: 'perter source',
      s3Source: 'perter s3Source',
      originPage: 'perter page',
      originThumb: ' peter originThumb',
      likes: [{user: 'peter'}, {user: 'rukeith'}],
      videoLength: 1234
    }

    videoCreate(payload).then(
        (res) => {
          done()
        }
    )
  })

  it('videoList()', (done) => {
    videoList().then(
      result => {
        videoId = result[0]._id
        done()
      }
    )
  })

  it('videoList({limit:20, skip:2})', (done) => {
    videoList({limit:2, skip:2}).then(
      result => {
        expect(result.length).toBe(2)
        done()
      }
    )
  })

  it('videoDetail()', (done) => {
    videoDetail(videoId).then(
      result => {
        expect(typeof result._id).toBe('object')
        expect(typeof result.s3Source).toBe('string')
        expect(typeof result.source).toBe('string')
        expect(typeof result.description).toBe('string')
        expect(typeof result.fbId).toBe('string')
        done()
      }
    )
  })
})
