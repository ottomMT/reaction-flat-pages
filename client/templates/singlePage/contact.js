  Template.contact.events({
    'submit form[name="contact"]': function(event) {
      var data = validate();
      if(data.name && data.name.length && data.mail && data.mail.length && data.comment && data.comment.length ) {
        $('.contact-widget h3 i').remove();
        $('.contact-widget h3').append('<i class="fa fa-cog fa-spin"></i>');
        sendMail(data);
      }
      event.preventDefault();
      event.stopPropagation();
      return false;
    },
    'blur': function(event) {
        var target = event.target;
        validate([{name: target.name, value: target.value}]);
    }
  });
    function sendMail(data) {
        Meteor.call('sendEmail_test',
            'all4climat@gmail.com',
            data.mail,
            data.name,
            data.comment, function(err) {
                $('.contact-widget h3 i').remove();
                if(err) {
                    $('.contact-widget h3').append('<i class="fa fa-ban"></i>');
                    throw new Meteor.Error(err.error, err.reason);
                } else {
                    $('.contact-widget h3').append('<i class="fa fa-check-circle-o"></i>');
                    $.each($('#contact-form').serializeArray(), function() {
                        $('[name="' + this.name + '"]').val('');
                        $('[name="' + this.name + '"]').parent().removeClass('has-error');
                        $('[name="' + this.name + '"]').parent().removeClass('has-success');
                    });
                }
            }
        );
    }
  function validate(target) {
      var data = {};
      if(!target) {
          var target = $('#contact-form').serializeArray();
      }
      $.each(target, function() {
        if(check(this.name, this.value)) {
            data[this.name] = this.value;
            $('[name="' + this.name + '"]').parent().removeClass('has-error');
            $('[name="' + this.name + '"]').parent().addClass('has-success');
        } else {
            $('[name="' + this.name + '"]').parent().removeClass('has-success');
            $('[name="' + this.name + '"]').parent().addClass('has-error');
        }
      });
      return data;
  }
  var nameRe = /^[a-zA-Zа-яА-ЯёЁ0-9 _.-]*$/;

  function check(name, value) {
    switch(name) {
        case 'name':
            if(value.length >= 2 && nameRe.test(value)) {
                return true;
            }
            return false;
            break;
        case 'mail':
            if(validateEmail(value)) {
                return true;
            }
            return false;
            break;
        case 'comment':
            if(value.length >= 4) {
                return true;
            }
            return false;
            break;
        default:
            return false;
    }
  }
  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }