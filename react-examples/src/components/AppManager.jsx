import React from "react";

import StyledButton from './common/StyledButton'
import {
  mountZeldaItemSelector1,
  mountZeldaItemSelector2,
  mountZeldaItemSelector3,
  mountZeldaItemSelector4,
  mountClassComponentStaticExample,
  mountComponentListExample,
  mountComponentListHighOrderExample,
  mountComponentListHighOrderExampleWithBordersExample,
  mountComponentWithStateExample,
  mountComponentWithSubComponentExample,
  mountFunctionComponentStaticExample,
  mountHtmlWithPlaceHoldersExample,
  mountMarvelCharactersExample,
  mountMarvelCharactersPaginatedExample,
  mountReduxSimpleExample,
  mountNoJsxExample,
  mountUseState,
  mountTodoList
} from "../simple-app-mounts";
import {mountMarvelSite, mountStaticSite} from "../site-app-mounts";

const AppManagerButtons = ({visible}) => {
  return <div className={!visible ? 'appManagerButtonsHidden': ''}>
    <StyledButton buttonText="StaticHtmlExample" actionOnClick={mountNoJsxExample} />
    <StyledButton buttonText="ClassComponentStaticExample" actionOnClick={mountClassComponentStaticExample} />
    <StyledButton buttonText="FunctionComponentStaticExample" actionOnClick={mountFunctionComponentStaticExample} />
    <StyledButton buttonText="HtmlWithPlaceHoldersExample" actionOnClick={mountHtmlWithPlaceHoldersExample} />
    <StyledButton buttonText="ComponentWithStateExample" actionOnClick={mountComponentWithStateExample} />
    <StyledButton buttonText="ComponentWithSubComponentExample" actionOnClick={mountComponentWithSubComponentExample} />
    <StyledButton buttonText="ComponentListExample" actionOnClick={mountComponentListExample} />
    <StyledButton buttonText="ComponentListHighOrderExample" actionOnClick={mountComponentListHighOrderExample} />
    <StyledButton buttonText="ComponentListHighOrderExampleWithBordersExample" actionOnClick={mountComponentListHighOrderExampleWithBordersExample} />
    <StyledButton buttonText="MarvelCharactersExample" actionOnClick={mountMarvelCharactersExample} />
    <StyledButton buttonText="MarvelCharactersPaginatedExample" actionOnClick={mountMarvelCharactersPaginatedExample} />
    <StyledButton buttonText="ReduxSimpleExample" actionOnClick={mountReduxSimpleExample} />
    <StyledButton buttonText="Zelda Item Selector 1" actionOnClick={mountZeldaItemSelector1} />
    <StyledButton buttonText="Zelda Item Selector 2" actionOnClick={mountZeldaItemSelector2} />
    <StyledButton buttonText="Zelda Item Selector 3" actionOnClick={mountZeldaItemSelector3} />
    <StyledButton buttonText="Zelda Item Selector 4" actionOnClick={mountZeldaItemSelector4} />
    <StyledButton buttonText="UseState" actionOnClick={mountUseState} />
    <StyledButton buttonText="Todo List" actionOnClick={mountTodoList} />
    <StyledButton buttonText="StaticSite" actionOnClick={mountStaticSite} />
    <StyledButton buttonText="MarvelSite" actionOnClick={mountMarvelSite} />
  </div>
}


export const AppManagerMenu = ()  =>{
  return <div className="simple-app-manager"><AppManagerButtons /></div>
}
