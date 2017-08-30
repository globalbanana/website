
import {isAdmin} from '../module/facebook'

export function requiredLogin (req,res,next) {
  const _token = req.cookies.fbAccessToken    
  
  isAdmin(_token).then(
      _isAdmin => {
          if(_isAdmin)
            next()
          else 
            res.send('Admin is required') 
      },
      err => {
        console.log('Admin is required ... ' + err)
        res.redirect('/login')        
      }
  )
}
