const { config } = require("../config/config");

function registerUser(req, res, next) {
  req.mail = {
    to: req.user.email,
    subject: `Bienvenid@ a Usame`,
    html: `<html>
                <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width" />
                    
                </head>
                <body bgcolor="#eff0f3" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; margin: 0; padding: 0; background: #eff0f3;">                  
                    <table class="body-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 20px;">
                        <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                            <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
                            <td class="container" bgcolor="#FFFFFF" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0; border: 1px solid #f0f0f0;">
                                <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 30px;">
                                    <table style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                                        <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                            <td style="font-family: Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                            <center>
                                                <img width="200" src="${config.baseUrl}/images/logomain.png"/>
                                            </center>
                                                <p style="font-family:  Helvetica, Arial, sans-serif; font-size: 16px; color: #000; font-weight: bold;">
                                                Estimad@ <b>${req.user.name} ${req.user.lastName}</b>,
                                            </p>
                                            <p style="text-align:justify; font-family:  Helvetica, Arial, sans-serif; font-size: 16px;color: #000;">
                                            Gracias por formar parte de la plataforma. Su nueva cuenta ha sido creada, para acceder es necesario que ingrese con su correo electr&oacute;nico y la siguiente contrase&ntilde;a temporal:
                                            </p>
                                            <center>
                                            <b style="font-size: 28px; letter-spacing: 5px; color: #4B3083;">${req.code}</b>
                                            </center>
                                            <br>
                                            <!--p style="text-align:justify ;font-family:  Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #024242; font-weight: normal; margin: 0 0 10px; padding: 0;">
                                                <br>
                                                <br>
                                                Atentamente
                                                <br>
                                                TUSPAGOS
                                            </p-->
                                            <p>** No responda este e-mail. Los correos enviados a esta dirección no serán tomados en cuenta.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                            <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
                        </tr>
                    </table>
                    <table class="footer-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; clear: both !important; margin: 0; padding: 0;"><tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
                        <td class="container" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">
                            <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                                <table style="font-family: Helvet Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                                    <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                        <td align="center" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                            <p style="font-family:  Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #666; font-weight: normal; margin: 0 0 10px; padding: 0;">
                                            &#169; Usame Empresas 
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                        <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
                        </tr>
                    </table>
                </body>
                </html>`,
  };

  next();
}

function recoverPassword(req, res, next) {
  req.mail = {
    to: req.user.email,
    subject: `Recuperar contraseña`,
    html: `<html>
        <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width" />
            
        </head>
        <body bgcolor="#eff0f3" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; margin: 0; padding: 0; background: #eff0f3;">                  
        
        <table class="body-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 20px;">
            <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
                <td class="container" bgcolor="#FFFFFF" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0; border: 1px solid #f0f0f0;">
                    <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 30px;">
                        <table style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                            <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                <td style="font-family: Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                <center>
                               <img width="200" src="${config.baseUrl}/img/PalankasbysimpleSAS.png"/>
                                </center>
                                 <p style="font-family:  Helvetica, Arial, sans-serif; font-size: 16px; color: #000; font-weight: bold;">
                                 Estimad@ <b>${req.user.name} ${req.user.lastName}</b>,
                                </p>
                                 <p style="text-align:justify; font-family:  Helvetica, Arial, sans-serif; font-size: 16px;color: #000;">
                                Usted ha solicitado la recuperación de su contraseña. Para continuar con el proceso, ingrese al siguiente c&oacute;digo en el sistema:
                                </p>
                                <center>
                                <!--b style="font-size: 16px; color: #024242"><a href="${req.link}" target="_blank">ABRIR ENLACE</a></b-->
                                <b style="font-size: 28px; letter-spacing: 5px; color: #4B3083;">${req.code}</b>
                                </center>
                                <br>
                                <!--p style="text-align:justify ;font-family:  Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #024242; font-weight: normal; margin: 0 0 10px; padding: 0;">
                                 <br>
                                 <br>
                                   Atentamente Polygraph.
                                </p-->
                                <p>** No responda este e-mail. Los correos enviados a esta dirección no serán tomados en cuenta.</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
            </tr>
        </table>
        <table class="footer-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; clear: both !important; margin: 0; padding: 0;"><tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
            <td class="container" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">
                <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table style="font-family: Helvet Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                        <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                            <td align="center" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                <p style="font-family:  Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #666; font-weight: normal; margin: 0 0 10px; padding: 0;">
                                    &#169; Usame Empresas 
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
            </tr>
        </table>
        </body>
        </html>`,
  };

  next();
}

function resetPassword(req, res, next) {
  req.mail = {
    to: req.user.email,
    subject: `Contraseña temporal`,
    html: `<html>
          <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
              <meta name="viewport" content="width=device-width" />
              
          </head>
          <body bgcolor="#eff0f3" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; margin: 0; padding: 0; background: #eff0f3;">                  
          
          <table class="body-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 20px;">
              <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                  <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
                  <td class="container" bgcolor="#FFFFFF" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0; border: 1px solid #f0f0f0;">
                      <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 30px;">
                          <table style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                              <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                  <td style="font-family: Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                  <center>
                                 <img width="200" src="${config.baseUrl}/img/PalankasbysimpleSAS.png"/>
                                  </center>
                                   <p style="font-family:  Helvetica, Arial, sans-serif; font-size: 16px; color: #000; font-weight: bold;">
                                   Estimad@ <b>${req.user.name} ${req.user.lastName}</b>,
                                  </p>
                                   <p style="text-align:justify; font-family:  Helvetica, Arial, sans-serif; font-size: 16px;color: #000;">
                                  Su contraseña temporal para acceder al sistema es la siguiente:
                                  </p>
                                  <center>                                  
                                  <b style="font-size: 28px; letter-spacing: 5px; color: #4B3083;">${req.code}</b>
                                  </center>
                                  <br>
                                  <!--p style="text-align:justify ;font-family:  Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #024242; font-weight: normal; margin: 0 0 10px; padding: 0;">
                                   <br>
                                   <br>
                                     Atentamente Polygraph.
                                  </p-->
                                  <p>** No responda este e-mail. Los correos enviados a esta dirección no serán tomados en cuenta.</p>
                                  </td>
                              </tr>
                          </table>
                      </div>
                  </td>
                  <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
              </tr>
          </table>
          <table class="footer-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; clear: both !important; margin: 0; padding: 0;"><tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
              <td class="container" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">
                  <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                      <table style="font-family: Helvet Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                          <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                              <td align="center" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                  <p style="font-family:  Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #666; font-weight: normal; margin: 0 0 10px; padding: 0;">
                                      &#169; Usame Empresas 
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </div>
              </td>
              <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
              </tr>
          </table>
          </body>
          </html>`,
  };

  next();
}

function sendRegisterClient(req, res, next) {
  const price = JSON.parse(req.clients.plan);

  req.mail = {
    to: req.clients.email,
    subject: `Registro con éxito`,
    pdfFilename: req.pdfFilename,
    html: `<html>
        <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width" />
            
        </head>
        <body bgcolor="#eff0f3" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; margin: 0; padding: 0; background: #eff0f3;">                  
        
        <table class="body-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 20px;">
            <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
                <td class="container" bgcolor="#FFFFFF" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0; border: 1px solid #f0f0f0;">
                    <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 30px;">
                        <table style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                            <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                <td style="font-family: Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                               <br>
                               <center>
                                <img width="200" src="https://usamebpo.com/wp-content/uploads/2020/11/logo-Usame-web-color.png" alt="logo"/>
                                </center>
                                <p style="font-size: 16px; font-family:  Helvetica, Arial, sans-serif; color: #000; font-weight: bold;">
                                Estimad@ <b>${req.clients.allNames}</b>,
                                </p>
                                <p style="font-size: 16px; font-family: Helvetica, Arial, sans-serif;text-align: justify;color: #000;">
                                Su registro se ha realizado con éxito, gracias por confiar en nosotros. El siguiente link es el ultimo paso para finalizar el proceso, debe realizar el débito bancario por el plan seleccionado.</p>
                                <p style="font-size: 16px; font-family: Helvetica, Arial, sans-serif;text-align: center;color: #000;">Link para realizar el pago:</p>
                                <br>
                                <center>
                                <a href="http://localhost:3000/payment?price=${price[0].price}&email=${req.clients.email}" target="_blank" style="cursor: pointer; text-decoration: underline #202C59;"><b style="font-size: 24px; letter-spacing: 4px; color: #202C59; padding: 20px; font-family: Helvetica, Arial, sans-serif;">Link de pago</b></a>
                                </center>
                                <br>
                                <br>
                                <br>
                                <p>** No responda este e-mail. Los correos enviados a esta dirección no serán tomados en cuenta.</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
                <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
            </tr>
        </table>
        <table class="footer-wrap" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; clear: both !important; margin: 0; padding: 0;"><tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"><td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
            <td class="container" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto; padding: 0;">
                <div class="content" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                    <table style="font-family: Helvet Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; width: 100%; margin: 0; padding: 0;">
                        <tr style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                            <td align="center" style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;">
                                <p style="font-family:  Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #666; font-weight: normal; margin: 0 0 10px; padding: 0;">
                                    &#169; USAME
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
            <td style="font-family:  Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6; margin: 0; padding: 0;"></td>
            </tr>
        </table>
        </body>
        </html>`,
  };

  next();
}

module.exports = {
  registerUser,
  recoverPassword,
  sendRegisterClient,
  resetPassword,
};
