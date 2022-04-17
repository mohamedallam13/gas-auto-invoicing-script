; (function (root, factory) {
  root.EMAIL = factory()
})(this, function () {

  const EMAIL = {}

  const TEST_EMAIL = "mohamedallam.tu@gmail.com, saeed@remoteplatz.com, hawass@remoteplatz.com"
  const LIVE = false;

  function sendOutEmail(invoiceObj) {
    var emailOptions = new EmailOptions(invoiceObj);
    return sendEmail(emailOptions);
  }

  function EmailOptions(invoiceObj, email) {
    var bodyObj = produceBody(invoiceObj.body, "", "")
    this.to = LIVE ? email : TEST_EMAIL;
    this.cc = LIVE ? invoiceObj.cc : '';
    this.bcc = LIVE ? invoiceObj.bcc : '';
    // this.replyTo = LIVE ? variables.defined_mail_account : '';
    this.name = 'Remoteplatz'
    this.subject = invoiceObj.subject;
    this.body = bodyObj.plain;
    this.htmlBody = bodyObj.html;
    if (invoiceObj.pdfFile) {
      this.attachments = [invoiceObj.pdfFile];
    }
  }

  function produceBody(text, signature, bye) {
    var bodyObj = {}
    // plain
    bodyObj.plain = text + '\n\n' + plainSignature(signature, bye);
    // html
    bodyObj.html = text.replace(/\n/g, '<br>') + htmlSignature(signature.replace(/\n/g, '<br>'), bye.replace(/\n/g, '<br>'), '90%');
    return bodyObj;
  }

  function plainSignature(sign, bye) {
    var signature = '--';
    signature += '\n' + bye + '\n\n' + sign
    return signature;
  }

  function htmlSignature(sign, bye, font_size) {
    var htmlsignature = '\<div style="font-size: ' + font_size + '">--';
    var pic = "" // '<br><br><a href="https://auto1.com/" target="_blank"><img alt="https://auto1.com/" src="https://content.auto1.com/de/Logo_AUTO1.com.jpg" height="45" width="auto"></a>\''
    htmlsignature += '<br>' + bye + pic + '<br>' + sign + '</div>'
    return htmlsignature;
  }

  function sendEmail(emailOptions) {
    /* parameters
    attachments  - BlobSource[] - an array of files to send with the email
    bcc          - String       - a comma-separated list of email addresses to BCC
    body         - String       - the body of the email
    cc           - String       - a comma-separated list of email addresses to CC
    htmlBody     - String       - if set, devices capable of rendering HTML will use it instead of the required body argument; you can add an optional inlineImages field in HTML body if you have inlined images for your email
    inlineImages - Object       - a JavaScript object containing a mapping from image key (String) to image data (BlobSource); this assumes that the htmlBody parameter is used and contains references to these images in the format <img src="cid:imageKey" /> (see example)
    name         - String       - the name of the sender of the email (default: the user's name)
    noReply      - Boolean      - true if the email should be sent from a generic no-reply email address to discourage recipients from responding to emails; this option is only possible for Google Apps accounts, not Gmail users
    replyTo      - String       - an email address to use as the default reply-to address (default: the user's email address)
    subject      - String       - the subject of the email
    to           - String       - the address of the recipient
    */
    var rdq = getRemainingDailyQuota();
    if (rdq < 1) {
      throw 'Remaining e-mail quota exceeded. Please send e-mail manually.';
    } else {
      try {
        MailApp.sendEmail(emailOptions)
      } catch (e) {
        Logger.log(e)
        return e
      };
    }
  }

  function getRemainingDailyQuota() {
    var rdq = MailApp.getRemainingDailyQuota();
    return rdq;
  }

  EMAIL.sendOutEmail = sendOutEmail;

  return EMAIL
})