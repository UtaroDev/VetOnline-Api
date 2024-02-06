import { transporter } from '../config/mailer'

export const sendEmail = async (toEmail: string, changePassLink: string) => {
  try {
    await transporter.sendMail({
      from: '"Forgot Password👻" <foo@example.com>', // sender address
      to: toEmail, // list of receivers
      subject: 'Forgot Password', // Subject line
      text: 'Forgot Password👻', // plain text body
      html: `<b>Porfavor haz click en el siguiente enlace para reestablecer tu contraseña, si no solicitaste un cambio de esta, ignora el email</b>
        <a href=${changePassLink}>${changePassLink}</a>
        ` // html body
    })
  } catch (error) {
    return error
  }
}
