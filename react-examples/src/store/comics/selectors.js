const Selectors = {}

Selectors.getComics = (state) => state.comics
Selectors.getComic = (state) => state.comic
Selectors.getOffset = (state) => state.offset
Selectors.getLimit = (state) => state.limit
Selectors.getTotal= (state) => state.total
Selectors.isFetching = (state) => state.isFetching

/*
Selectors.getComics = (state) => state['comics'].comics
Selectors.getComic = (state) => state['comics'].comic
Selectors.getOffset = (state) => state['comics'].offset
Selectors.getLimit = (state) => state['comics'].limit
Selectors.getTotal= (state) => state['comics'].total
Selectors.isFetching = (state) => state['comics'].isFetching
*/

export {Selectors}