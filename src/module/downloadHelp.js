let https = require('https')
let http = require('http')
let downloadableAPI = require('url-valid')
let fs = require('fs')

let fileNameUtil = require('./utils/fileName')

function downloadAPI (url0) {
  let downloadlink = url0

  let httprequest

  let path = ''

  let isStart = true

  let errMsg = ''

  setHttpRequest(url0)

  function setHttpRequest (t) {
    if (isHttps(t) === 1) {
      httprequest = https
    } else if (isHttps(t) === 0) {
      httprequest = http
    } else {
      console.log(' error on http or https')
      isStart = false
      errMsg = ' error on http or https'
    }
  }

  function setPath (str) {
    if (fs.existsSync(str)) {
      path = str
    } else {
      console.log('path is not existed, please create it before save it')
      errMsg = 'path is not existed, please create it before save it'
    }
    return
  }

  function isHttps (url) {
    if (url.indexOf('http://') === 0) {
      return 0
    } else if (url.indexOf('https://') === 0) {
      return 1
    } else {
      return -1
    }
  }

  function isDownloadable (url) {
    return new Promise(function (resolve, reject) {
      downloadableAPI(url, function (err, valid) {
        if (err) {
          reject(err)
        } else {
          if (valid) {
            resolve()
          } else {
            errMsg = 'linke is not downloadable'
            reject(new Error(errMsg))
          }
        }
      })
    })
  }

  function downloadToLocal () {
    return new Promise(function (resolve, reject) {
      if (!isStart) {
        reject(new Error('it is not start...'))
      }

      let filename = fileNameUtil.urlFileName(downloadlink)

      let dist = path + '/' + filename

      let readableStream = fs.createWriteStream(dist)

      httprequest.get(downloadlink, function (response) {
        response.pipe(readableStream)

        readableStream.on('finish', function () {
          readableStream.close(function () {
            resolve({dist: dist, errMsg: errMsg})
          })  // close() is async, call cb after close completes.
        })
      }).on('error', function (err) { // Handle errors
        reject(err)
        fs.unlink(dist)
      })
    })
  }

  function triggerDownload () {
    return new Promise(function (resolve, reject) {
      isDownloadable(downloadlink).then(function (result1) {
        return downloadToLocal()
      }).then(function (result2) {
        resolve(result2)
      }, function (error) {
        reject(error)
      })
    })
  }

  return {
    start: triggerDownload,
    isHttps: isHttps,
    isDownloadable: isDownloadable,
    setPath: setPath
  }
}

module.exports = downloadAPI
