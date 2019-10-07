const Selectors = {}

Selectors.getCharacters = (state) => state.characters
Selectors.getCharacter = (state) => state.character
Selectors.getOffset = (state) => state.offset
Selectors.getLimit = (state) => state.limit
Selectors.getTotal= (state) => state.total
Selectors.isFetching = (state) => state.isFetching

/*
Selectors.getCharacters = (state) => state['characters'].characters
Selectors.getCharacter = (state) => state['characters'].character
Selectors.getOffset = (state) => state['characters'].offset
Selectors.getLimit = (state) => state['characters'].limit
Selectors.getTotal= (state) => state['characters'].total
Selectors.isFetching = (state) => state['characters'].isFetching
*/

export {Selectors}