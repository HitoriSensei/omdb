const mergeWith = require('lodash/mergeWith')

function customizer(objValue, srcValue, key, object, source, stack) {
  if (stack.size === 0 && objValue) {
    switch (key) {
      case 'rewrites': {
        return async () => {
          return [...(await objValue()), ...(await srcValue())]
        }
      }
      case 'redirects': {
        return async () => {
          return [...(await objValue()), ...(await srcValue())]
        }
      }
      case 'webpack': {
        return (config, ctx) => {
          return srcValue(objValue(config, ctx), ctx)
        }
      }
    }

    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue)
    }

    if (Array.isArray(srcValue)) {
      return [objValue, ...srcValue]
    }

    return mergeWith(srcValue, objValue, customizer)
  }

  return srcValue
}

module.exports = (target, ...configs) => mergeWith(target, ...configs, customizer)
