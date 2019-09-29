const Selectors = {}

Selectors.getComics = (state) => state['comics'].comics
Selectors.getComic = (state) => state['comics'].comic
Selectors.getOffset = (state) => state['comics'].offset
Selectors.getLimit = (state) => state['comics'].limit
Selectors.getTotal= (state) => state['comics'].total
Selectors.isFetching = (state) => state['comics'].isFetching


export {Selectors}