import React, { Component } from "react";


export default class LeaderBoard extends Component {

    renderPlayer(player){
        return (
            <div 
                key={player.id} 
                className="playerScore">
                <div>Name:{player.name}</div>
                <div>Wins:{player.wins}</div>
                <div>Loses:{player.loses}</div>
            </div>
        )
    }

    render(){
        let players = this.props.players

        return(
            <div className="leaderboard">
                LeaderBoard
                {players.map(player=>this.renderPlayer(player))}
            </div>
        )
    }
}