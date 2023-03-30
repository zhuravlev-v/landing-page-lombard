import JustValidate from 'just-validate';
import Inputmask from "inputmask";
import vars from "../_vars";

let validationIndex = 1

export const validateForms = (selector, rules, afterSend) => {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  const validation = new JustValidate(selector, {
    errorLabelStyle: {
      display: 'none'
    },
    focusInvalidField: false,
  });

  vars[`validation-${validationIndex}`] = validation
  validationIndex++

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules, item.config);
  }

  validation.onSuccess((ev) => {
    let formData = new FormData(ev.target);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend(true);
          }
          // console.log('Отправлено');
        }
        else if (xhr.status > 399) {
          if (afterSend) {
            afterSend(false);
          }
        }
      }
    }

    xhr.open('POST', 'https://a2ca7bae-0627-4cae-a30b-b0b8eeab1bd3.mock.pstmn.io/form', true);
    xhr.send(formData);

    ev.target.reset();
  })

  validation.onFail((fields) => {

    for (const key in fields) {
      if (fields[key].elem.type !== 'checkbox') {
        if (fields[key].isValid) {
          fields[key].elem.value = fields[key].elem.getAttribute('data-value-origin')
          fields[key].elem.setAttribute('data-value-origin', fields[key].elem.value)
          fields[key].elem.setAttribute('placeholder', fields[key].elem.getAttribute('data-placeholder-origin'))
        }
        else {
          // fields[key].elem.setAttribute('data-value-origin', fields[key].elem.value)
          fields[key].elem.setAttribute('placeholder', fields[key].errorMessage)
          fields[key].elem.value = ''
        }
      }
    }

  })

};
