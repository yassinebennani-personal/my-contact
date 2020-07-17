import { Request, Response } from "express";
const sgMail = require('@sendgrid/mail');

export class EmailController {
  public send(req: Request, res: Response) {
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
}

export class EmailRoutes {

    public controller: EmailController = new EmailController();
  
    public routes(router: any) {
        router.route("/send").post(this.controller.send);
        return router;
    }
}