

  async function Logout(req, res){


      req.session.destroy((error) =>{

          if(error){

              console.log('Session destroy error:', error);

              res.status(500).json({

                  success: false,

                  message: 'Logout error'

              })

           } else{
           

                  res.status(200).json({

                      success: true,

                      message: 'Logout successful'

                  })

              }

          })

      }

  module.exports = {
Logout
  }
  