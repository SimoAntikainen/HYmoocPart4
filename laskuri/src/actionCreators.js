const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export default {
  noteCreation(content) {
    return {
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId()
      }
    }
  },
  importanceToggling(id) {
    return {
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    }
  }
}