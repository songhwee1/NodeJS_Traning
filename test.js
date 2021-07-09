const nodemailer = require('nodemailer');
const email = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "eb17aa40e64063",
      pass: "dca5fc162d22dc"
    }
};

const send =  async ( option ) => {
    nodemailer.createTransport(email).sendMail(option,(error,info) => {
        if(error){
            console.log(error);
        }
        else{
            console.log(info);
            return info.response;
        }

    })  
};

let emailData = {
    from: 'songhwee1@naver.com',
    to: 'songhwee1@naver.com',
    subject: '메일 테스트',
    text: '나는 코딩천재'
}

send(emailData);