import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardsList from "./CardsList";
import { deleteDeck } from "../../utils/api";
import { useHistory } from "react-router-dom";

function Deck() {

    const params = useParams();
    const deckId = params.deckId;
    const [deck, setDeck] = useState({});
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await readDeck(deckId);
                setDeck(response);
            } catch(error) {
                console.log(error);
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    const deleteHandler = () => {
        if (window.confirm("Delete this deck? \n\nYou will not be able to recover it")) {
            deleteDeck(deck.id);
            history.push("/");
        }
    }

    if (!deck.name) return null;

    let title = "";
    if (deck.cards && deck.cards.length) {
        title = "Cards";
    } else {
        title = "No Cards";
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
            </nav>
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <div className="d-flex flex-row justify-content-between mb-5">
                <div>
                    <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">Edit</Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">Study</Link>
                    <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
                </div>
                <button type="button" className="btn btn-danger" onClick={deleteHandler}>Delete</button>
            </div>
            <h3>{title}</h3>
            <CardsList cards={deck.cards} deckId={deckId}/>
        </div>
    )
}

export default Deck;