import { Request, Response } from "express";
const sgMail = require('@sendgrid/mail');
var sbSdk = require('sib-api-v3-sdk');


export class EmailController {
  public sendGrid(req: Request, res: Response) {
      console.log(req.body);
      sgMail.setApiKey('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');
      const msg = {
        to: 'yassinebennani@outlook.com',
        from: {
          email: 'bennaniyassine@gmail.com',
          name: 'Recruitment-' + req.body.name + '<' + req.body.email + '>',
        },
        subject: req.body.subject,
        text: req.body.content,
      };
      //ES6
      sgMail.send(msg)
        .then(() => {}, error => {
          console.error(error);
          if (error.response) {
            console.error(error.response.body)
          }
      });
  }

  public sendBlue(req: Request, res: Response) {
    var client = sbSdk.ApiClient.instance;

    // Configure API key authorization: api-key
    var apiKey = client.authentications['api-key'];
    apiKey.apiKey = "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"
    console.log(req.body);

    var sbMail = new sbSdk.SMTPApi();
    const msg = {
      to: [
        {
          "email": "yassinebennani@outlook.com",
          "name": "Yassine BENNANI"
        }
      ],
      sender: {
        name: 'Recruitment-' + req.body.name + '<' + req.body.email + '>',
        email: 'bennaniyassine@gmail.com'
      },
      subject: req.body.subject,
      textContent: req.body.content,
    };
    //ES6
    sbMail.sendTransacEmail(msg).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
  }
}

export class EmailRoutes {

    public controller: EmailController = new EmailController();
  
    public routes(router: any) {
        router.route("/send").post(this.controller.sendBlue);
        return router;
    }
}