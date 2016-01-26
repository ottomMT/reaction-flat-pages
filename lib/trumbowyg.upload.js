/* ===========================================================
 * trumbowyg.upload.js v1.1
 * Upload plugin for Trumbowyg and Reaction Flat Pages
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D) with ramusus updates
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */

(function ($) {
  'use strict';

  function getDeep(object, propertyParts) {
    var mainProperty = propertyParts.shift(),
      otherProperties = propertyParts;

    if (object !== null) {
      if (otherProperties.length === 0) {
        return object[mainProperty];
      }

      if (typeof object === 'object') {
        return getDeep(object[mainProperty], otherProperties);
      }
    }
    return object;
  }

  $.extend(true, $.trumbowyg, {
    langs: {
      en: {
        upload: 'Upload',
        file: 'File',
        uploadError: 'Error'
      },
      ru: {
        upload: 'Загрузить',
        file: 'Файл',
        uploadError: 'Ошибка'
      },
      sk: {
        upload: 'Nahrať',
        file: 'Súbor',
        uploadError: 'Chyba'
      },
      fr: {
        upload: 'Envoi',
        file: 'Fichier',
        uploadError: 'Erreur'
      },
      cs: {
        upload: 'Nahrát obrázek',
        file: 'Soubor',
        uploadError: 'Chyba'
      }
    },

    upload: {},

    opts: {
      btnsDef: {
        upload: {
          func: function (params, tbw) {
            let file,
              prefix = tbw.o.prefix;

            let $modal = tbw.openModalInsert(
              // Title
              tbw.lang.upload,

              // Fields
              {
                file: {
                  type: 'file',
                  required: true
                },
                alt: {
                  label: 'description'
                }
              },

              // Callback
              function (values) {
                tbw.o.uploadHandler(tbw, values.alt);
              }
            );

            $('input[type=file]').on('change', function (e) {
              try {
                // If multiple files allowed, we just get the first.
                file = e.target.files[0];
              } catch (err) {
                // In IE8, multiple files not allowed
                file = e.target.value;
              }
            });
          },
          ico: 'insertImage'
        }
      }
    }
  });
})(jQuery);
