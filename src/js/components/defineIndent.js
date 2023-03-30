import vars from '../_vars';

function defineIndent(parent, child, indent, margin = 50, padding = 50) {
  function calcIndent() {
    const childHeight = parseFloat(getComputedStyle(child).height)
    const marginTop = childHeight * margin / 100
    const paddingTop = childHeight * padding / 100

    parent.style.marginTop = marginTop + indent + 'px'
    parent.style.paddingTop = paddingTop + indent + 'px'
    child.style.top = marginTop * -1 + 'px'
  }

  calcIndent()

  window.addEventListener('resize', () => {
    calcIndent()
  })
}

window.addEventListener('load', (event) => {
  
  const vehiclesTop = document.querySelector('.vehicles__top')
  defineIndent(vars.vehiclesSection, vehiclesTop, 60, 68.3, 31.7)
})

defineIndent(vars.contactsSection, vars.forNewSection, 60)