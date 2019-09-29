const Selectors = {}

Selectors.getCharacters = (state) => state.characters
Selectors.getCharacter = (state) => state.character
Selectors.getOffset = (state) => state.offset
Selectors.getLimit = (state) => state.limit
Selectors.getTotal= (state) => state.total
Selectors.isFetching = (state) => state.isFetching

export {Selectors}