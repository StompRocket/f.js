const debug = a => ''

export function render(element, htmlObject, handler, model) {
  function f(c) {
    render(element, htmlObject, handler, c)
  }
  let e = document.querySelector(element)
  e.innerHTML = ''
  e.appendChild(htmlObject(model)(f, handler, model))
}

function orStr(e) {
  if (typeof e !== 'function' || !(e instanceof Function)) {
    return () => document.createTextNode(String(e))
  } else {
    return function(r, h, model) {
      debug("applying", Array.prototype.slice.call(arguments, 0))
      return e(r, h, model)
    }
  }
}

function elem(e) {
  return function() {
    var attrs = Array.prototype.slice.call(arguments, 0);
    return function() {
      var body = Array.prototype.slice.call(arguments, 0);
      if (arguments[0] instanceof Array) {
        body = arguments[0]
      }

      return function(renderFactory, handler, model) {
        debug(body, attrs, model)
        let element = document.createElement(e)
        debug("about to apply handler")
        debug(handler('Event', model))
        debug("applied handler")

        body.forEach(el => {
          debug("El", el)
          let e = orStr(el)(renderFactory, handler, model)
          debug("Adding", e)
          element.appendChild(e)
        })

        attrs.forEach(a => {
          element = a(renderFactory, element, model, handler)
        })
        debug("Returning", element)
        return element
      }

    }
  }
}

function attr(e) {
  return function(v) {
    return function(r, o, model, h) {
      debug("o =", o)
      o.setAttribute(e, v)
      return o
    }
  }
}

export const div   = elem('div')
export const a     = elem('a')
export const i     = elem('i')
export const b     = elem('b')
export const p     = elem('p')
export const span  = elem('span')
export const btn   = elem('button')

export const classList = attr('class')
export const idList = attr('id')

export function onClick(event, body) {
  return function(renderFactory, element, model, handler) {
    element.addEventListener("click", () => {
      let newmodel = handler(event, model, body)
      renderFactory(newmodel)
    })
    return element
  }
}
