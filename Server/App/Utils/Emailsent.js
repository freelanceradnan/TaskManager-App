import nodemailer from 'nodemailer'
export const EmailSend=async({email,sub,message})=>{
    try {
    const trasporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"reactorbro722@gmail.com",
            pass:"aqto ucdq nlyn koad"
        }
    })
    const mailoptions={
        from:email,
        to:"reactorbro722@gmail.com",
        subject:sub,
        text:message
    }
    await trasporter.sendMail(mailoptions)
    return {success:true,message:"email sent success!"}
    } catch (error) {
      return {success:false,message:"email sent failed!"}  
    }
}