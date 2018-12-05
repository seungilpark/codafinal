import React, { Component } from "react";
import Manual from "./manual.js"
import LeaderBoard from "./leaderboard.js"
import Axios from "axios";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players:[

            ]
        }
    }

    componentDidMount(){
        // make a axios request to the server
        //  to get a list of playerStatus e.g.[{name:, wins:, loses:}, {},{}...]
        Axios.get("urlgoeshere/players").then(res=>{
            console.log(res)
            this.setState({
                players:res.data
            });
        });
    }

    render(){
        
        let { wins, loses } = this.props.playerStatus;
        let total = wins + loses;

        return(
            <header className="menu">
                <div className="logo">CODA</div>
                <div>wins: {wins}</div>
                <div>loses: {loses}</div>
                <div>
                win_rate: {total ? (wins / total) * 100 : 0} %
                </div>
                <LeaderBoard 
                    players={this.state.players}
                />
                <Manual />
                <div>Logout</div>
            </header>
        )
    }
}
