import { validateForms } from '../functions/validate-forms';
import vars from "../_vars";

function getTextRule(selector, container = null) {
  return {
    ruleSelector: selector,
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле имя'
      }
    ],
    config: {
      errorsContainer: document.querySelector(container),
    }
  }
}

function getTelRule(selector, container = null) {
  return {
    ruleSelector: selector,
    tel: true,
    telError: 'Введите корректный телефон',
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле телефон'
      }
    ],
    config: {
      errorsContainer: document.querySelector(container),
    }
  }
}

function getCheckboxRule(selector, container = null) {
  return {
    ruleSelector: selector,
    rules: [
      {
        rule: 'required',
        value: true,
        // errorMessage: 'Примите условия политики конфиденциальности!
        errorMessage: false,
      }
    ],
    config: {
      // errorsContainer: document.querySelector(container),
    }
  }
}

const afterForm = (success) => {
  if (success) {
    vars.modal.close('modal-form')
    vars.modal.open('success')
  }
  else {
    vars.modal.close('modal-form')
    vars.modal.open('fail')
  }
};

const allowedTypes = ['text', 'tel', 'checkbox']
const forms = Array.from(document.querySelectorAll('form[id^="form-"]'))

forms.forEach((form, index) => {
  const formRules = []
  for (const element of form.elements) {
    if (allowedTypes.includes(element.type)) {
      const containerName = `#form-error-container-${index + 1}`
      if (element.type === 'text') formRules.push(getTextRule(element, containerName))
      if (element.type === 'tel') formRules.push(getTelRule(element, containerName))
      if (element.type === 'checkbox') formRules.push(getCheckboxRule(element, containerName))
    }
  }

  if (formRules.length > 0) {
    const formName = `#form-${index + 1}`
    validateForms(formName, formRules, afterForm);
  }
})

forms.forEach((form, index) => {
  Array.from(form.elements).forEach((input, index) => {
    if (allowedTypes.includes(input.type) && input.type !== 'checkbox') {
      input.setAttribute('data-value-origin', input.value)
      input.setAttribute('data-placeholder-origin', input.placeholder)


      input.addEventListener('input', (event) => {
        event.target.setAttribute('data-value-origin', event.target.value)
      })

      input.addEventListener('focus', (event) => {
        event.target.value = event.target.getAttribute('data-value-origin')

        if (event.target.type === 'tel') {
          const cursorIndex = event.target.value.split('').findIndex(char => char === '_') === -1 ? event.target.value.length : event.target.value.split('').findIndex(char => char === '_')
          setTimeout(() => {
            event.target.selectionStart = event.target.selectionEnd = cursorIndex
          }, 0);
        }

      })

      input.addEventListener('blur', (event) => {
        if (event.target.classList.contains('just-validate-error-field')) {
          event.target.value = ''
        }
      })

    }
  })
})