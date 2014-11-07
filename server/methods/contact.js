    Meteor.methods({
        sendEmail_test: function(to, from, subject, text) {
            // Email.send работает пока только по SMTP протоколу,
            // на сервере стоит sendmail, поэтому отправляем почту
            // выполнением shell комманды

            check([to, from, subject, text], [String]);

            this.unblock();

            var exec = Npm.require('child_process').exec;
            var cmd = "echo \"subject:" + subject + "\n" + text + "\n\" | sendmail -f info@gazprommet.ru" + to + " alexmironoff@gmail.com, teachmefly@gmail.com";

            exec(cmd);
        },

        sendEmail: function (to, from, subject, text) {
            check([to, from, subject, text], [String]);

            // Let other method calls from the same client start running,
            // without waiting for the email sending to complete.
            this.unblock();

            Email.send({
                to: to,
                from: from,
                cc: 'alexmironoff@gmail.com, teachmefly@gmail.com',
                subject: subject,
                text: text
            });
        }

    });
