import React, { Fragment } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "./Home/DeckList";
import Study from "./Study/Study";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck/Deck";
import EditDeck from "./EditDeck";
import EditCard from "./ModifyCard/EditCard";
import AddCard from "./ModifyCard/AddCard";
import { Route, Switch } from "react-router-dom";

function Layout() {

  return (
    <Fragment>
      <Header />
      <div className="container col-8 mb-5">
        <Switch>
          <Route exact path="/">
            <Decks />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
            
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;