import React from 'react';
import ReactDOM from 'react-dom';
import {NoJsxComponentStaticExample,ClassComponentStaticExample ,FunctionComponentStaticExample } from './components/simple-exemples/StaticHtmlExample'
import HtmlWithPlaceHoldersExample from './components/simple-exemples/HtmlWithPlaceHoldersExample'
import ComponentWithState from './components/simple-exemples/ComponentWithState'
import ComponentWithSubComponent from './components/simple-exemples/ComponentWithSubComponent'
import ComponentList, {ComponentListHighOrder} from './components/simple-exemples/ComponentList'

import MarvelCharacters from './components/marvel/characters/MarvelCharacters'
import MarvelCharactersPaginated from './components/marvel/characters/MarvelCharactersPaginated'
import withBorders from './components/simple-exemples/WithBorders.jsx'
import ReduxSimpleExample from './components/simple-exemples/redux/ReduxSimpleExample'
import ZeldaItemSelector1 from "./components/simple-exemples/redux/ZeldaItemsSelector1";
import ZeldaItemSelector2 from "./components/simple-exemples/redux/ZeldaItemsSelector2";
import ZeldaItemSelector3 from "./components/simple-exemples/redux/ZeldaItemsSelector3";
import ZeldaItemSelector4 from "./components/simple-exemples/redux/ZeldaItemsSelector4";
import HookTest from './components/hooks/HookTests'
import TodoList from './components/simple-exemples/TodoList'

export const mountNoJsxExample = () => {
  ReactDOM.render(NoJsxComponentStaticExample, document.getElementById('root'))
}

export const mountClassComponentStaticExample = () => {
  ReactDOM.render(<ClassComponentStaticExample />, document.getElementById('root'))
}

export const mountFunctionComponentStaticExample = () => {
  ReactDOM.render(<FunctionComponentStaticExample />, document.getElementById('root'))
}


export const mountHtmlWithPlaceHoldersExample = () => {
  ReactDOM.render(<HtmlWithPlaceHoldersExample
      title="Texte en paramètre"
      message="Maintenant le texte est passé en paramètre"
    />,
    document.getElementById('root')
  )
}
export const mountComponentWithStateExample = () => {
  ReactDOM.render(<ComponentWithState/>,
    document.getElementById('root')
  )
}

export const mountComponentWithSubComponentExample = () => {
  ReactDOM.render(<ComponentWithSubComponent/>,
    document.getElementById('root')
  )
}

const components  =[
  {component: ClassComponentStaticExample},
  {component: HtmlWithPlaceHoldersExample, props: {title:"Texte en paramètre", message:"Maintenant le texte est passé en paramètre"}},
  {component: ComponentWithSubComponent},
  {component: ComponentWithState}
]

export const mountComponentListExample = () => {
  ReactDOM.render(<ComponentList components={components} />,
    document.getElementById('root')
  )
}

export const mountComponentListHighOrderExample = () => {
  const List = ComponentListHighOrder(components)
  ReactDOM.render(<List />,
    document.getElementById('root')
  )
}

export const mountComponentListHighOrderExampleWithBordersExample = () => {
  const List = ComponentListHighOrder(components)
  const ComponentListWithBorders = withBorders(List)
  ReactDOM.render(<ComponentListWithBorders />,
    document.getElementById('root')
  )
}

export const mountMarvelCharactersExample = () => {
  ReactDOM.render(<MarvelCharacters />,
    document.getElementById('root')
  )
}

export const mountMarvelCharactersPaginatedExample = () => {
  ReactDOM.render(<MarvelCharactersPaginated />,
    document.getElementById('root')
  )
}

export const mountReduxSimpleExample = () => {
  ReactDOM.render(<ReduxSimpleExample />,
    document.getElementById('root')
  )
}

export const mountZeldaItemSelector1 = () => {
  ReactDOM.render(<ZeldaItemSelector1 />,
    document.getElementById('root')
  )
}

export const mountZeldaItemSelector2 = () => {
  ReactDOM.render(<ZeldaItemSelector2 />,
    document.getElementById('root')
  )
}


export const mountZeldaItemSelector3 = () => {
  ReactDOM.render(ZeldaItemSelector3,
    document.getElementById('root')
  )
}
export const mountZeldaItemSelector4 = () => {
  ReactDOM.render(ZeldaItemSelector4,
    document.getElementById('root')
  )
}

export const mountUseState = () => {
  ReactDOM.render(<HookTest />,
    document.getElementById('root')
  )
}

export const mountTodoList = () => {
  ReactDOM.render(<TodoList />,
    document.getElementById('root')
  )
}