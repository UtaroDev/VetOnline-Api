import { error } from 'node:console'
import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_API,
    pass: process.env.ADMIN_API_KEY
  }
})

transporter
  .verify()
  .then(() => {
    console.log('Ready for send emails')
  })
  .catch(error)
