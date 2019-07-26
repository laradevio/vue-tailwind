<<<<<<< HEAD
=======
import flatten from 'lodash/flatten'
import get from 'lodash/get'

>>>>>>> cea04db... The multioption components now allows you to select which attribute should be used as as value and text in the options
const hasMultioptions = {
  props: {
    valueAttribute: {
      type: String,
      default: null
    },
    textAttribute: {
      type: String,
      default: null
    },
    options: {
      type: [Array, Object],
      default: () => []
    },
  },
  computed: {
    normalizedOptions () {
      if (Array.isArray(this.options)) {
        return this.options.map(option => this.normalizeOption(option))
      } else {
        return Object.keys(this.options).map(key => ({
          value: key,
          text: this.options[key]
        }))
      }
    },
  },
  methods: {
    guessOptionValue(option) {
      if (this.valueAttribute) {
        return get(option, this.valueAttribute) 
      }
      return get(option, 'value', get(option, 'id', get(option, 'text')))
    },
    guessOptionText(option) {
      if (this.textAttribute) {
        return get(option, this.textAttribute) 
      }
      return get(option, 'text', get(option, 'label'))
    },
    normalizeOption (option) {
      if (['string', 'number', 'boolean'].includes(typeof option)) {
        return {
          value: option,
          text: option,
        }
      }

      return {
        value: this.guessOptionValue(option),
        text: this.guessOptionText(option),
      }
    },
  }
}

export default hasMultioptions
