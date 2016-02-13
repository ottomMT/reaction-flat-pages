/**
 * pageDetailEdit helpers
 */

Template.pageDetailEdit.helpers({
  i18nPlaceholder: function () {
    i18nextDep.depend();
    let i18nKey = `pageDetailEdit.${this.field}`;
    if (i18n.t(i18nKey) === i18nKey) {
      ReactionCore.Log.info(`returning empty placeholder pageDetailEdit: ${i18nKey} no i18n key found.`);
    } else {
      return i18n.t(i18nKey);
    }
  }
});

/**
 * pageDetailEdit events
 */

Template.pageDetailEdit.events({
  "change input:text,textarea, blur textarea, tbwblur, tbwchange": function (event) {
    const self = this;
    const pageId = ReactionPage.selectedPageId();
    const value = $(event.currentTarget).val();

    if (this.field === 'content' && event.type.indexOf('change') != -1) {
      // save every 5 sec during content changing in textarea field
      let key = `editing-${this.field}-savetime`;
      let now = Number(new Date());
      let prev = Session.get(key);
      if (now - prev < 5000) {
        return
      }
      Session.set(key, now);
      // return if this is initial event for content field
      if (!prev) {
        return
      }
    } else if (this.field === 'content' && event.type == 'tbwblur') {
      // on loosing focus, check and delete all Media, which are not in the current content
      let Media = ReactionCore.Collections.Media;
      let pageMedia = Media.find({"metadata.pageId": pageId});
      Media.find({"metadata.pageId": pageId}).forEach(function(media) {
        if (value.indexOf(media.url()) == -1) {
          Media.remove({"_id": media._id}, 1);
        }
      });
    }

    Reaction.FlatPages.methods.updatePageField.call(pageId, this.field, value,
      (error) => {
        if (error) {
          return Alerts.inline(error.reason, "danger", {
            placement: "pageManagement",
            i18nKey: "pageDetail.errorMsg",
            id: this._id
          });
        }
        // go to new url of page
        if (self.field === 'handle') {
          return ReactionRouter.setParams({handle: value});
          //ReactionRouter.go("/page/" + value);
        }
        // animate updated field
        return $(event.currentTarget).animate({
          backgroundColor: "#e2f2e2"
        }).animate({
          backgroundColor: "#fff"
        });
      });

    return Session.set("editing-" + this.field, false);
  }
});

/**
 * pageDetailField events
 */

Template.pageDetailField.events({
  "click .page-detail-field": function () {
    if (ReactionCore.hasOwnerAccess()) {
      let fieldClass = "editing-" + this.field;
      Session.set(fieldClass, true);
      Tracker.flush();
      return $(`.${this.field}-edit-input`).focus();
    }
  }
});

/**
 * pageDetailEdit onRendered
 */

Template.pageDetailEdit.onRendered(function () {
  Session.delete('editing-content-savetime');
  $('.content-edit-input').trumbowyg({
    btnsDef: {
      image: {
        title: 'Insert image',
        dropdown: ['insertImage', 'upload'],
        ico: 'insertImage'
      }
    },
    btns: ['viewHTML',
      '|', 'formatting',
      '|', 'btnGrp-semantic',
      '|', 'link',
      '|', 'image',
      '|', 'btnGrp-justify',
      '|', 'btnGrp-lists',
      '|', 'horizontalRule',
      '|', 'removeformat'
    ],
    removeformatPasted: true,
    autogrow: true,
    fullscreenable: false,
    lang: Session.get("language"),
    uploadHandler: function(tbw, alt) {
      for(let fileObj of Session.get('files-uploaded')) {
        var url = fileObj.url();
        tbw.execCmd('insertImage', url);
        $('img[src="' + url + '"]:not([alt])', tbw.$box).attr('alt', alt);
        setTimeout(function () {
          tbw.closeModal();
        }, 250);
      }
    },
  });
  // TODO: move to CSS
  // changing default width
  $('.trumbowyg-box').css('width', '100%');
});
