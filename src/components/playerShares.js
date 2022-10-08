import React, { useState, useEffect } from "react";

const PlayerShares = (props) => {
    const [playerShares, setPlayerShares] = useState([])

    useEffect(() => {
        setPlayerShares(props.playerShares)
    })

    const showLeagues = (player_id) => {
        let ps = playerShares
        ps.filter(x => x.id === player_id).map(player => {
            return player.isLeaguesHidden = player.isLeaguesHidden === undefined ? false : !player.isLeaguesHidden
        })
        setPlayerShares([...ps])
    }

    const header = (
        <tr className="main_header">
            <td colSpan={3}>
                Name
            </td>
            <td>
                Leagues
            </td>
            <td>
                Wins
            </td>
            <td>
                losses
            </td>
            <td>
                Win PCT
            </td>
            <td>
                PF
            </td>
            <td>
                PA
            </td>
            <td>
                <em>
                    Avg Margin
                </em>
            </td>
        </tr>
    )

    const player_shares = playerShares.map((player, index) =>
        <React.Fragment
            key={`${player.id}_${index}`}>
            <tr
                className={player.isLeaguesHidden === false ? "main_row_active clickable" : "main_row clickable"}
                style={{
                    zIndex: index
                }}
                onClick={() => showLeagues(player.id)}
            >
                <td>
                    {
                        props.avatar(player.id, player.name.full_name, 'player')
                    }
                </td>
                <td colSpan={2}>
                    {
                        player.name.full_name
                    }
                </td>
                <td>
                    {
                        player.leagues_owned.length
                    }
                </td>
                <td>
                    {
                        player.leagues_owned.reduce((acc, cur) => acc + cur.wins, 0)
                    }
                </td>
                <td>
                    {
                        player.leagues_owned.reduce((acc, cur) => acc + cur.losses, 0)
                    }
                </td>
                <td>
                    <em>
                        {
                            (player.leagues_owned.reduce((acc, cur) => acc + cur.wins, 0) /
                                player.leagues_owned.reduce((acc, cur) => acc + cur.losses + cur.wins, 0)).toLocaleString("en-US", { maximumFractionDigits: 4, minimumFractionDigits: 4 })
                        }
                    </em>
                </td>
                <td>
                    {
                        player.leagues_owned.reduce((acc, cur) => acc + cur.fpts, 0).toLocaleString("en-US")
                    }
                </td>
                <td>
                    {
                        player.leagues_owned.reduce((acc, cur) => acc + cur.fpts_against, 0).toLocaleString("en-US")
                    }
                </td>
                <td>
                    <em>
                        {
                            (
                                (
                                    player.leagues_owned.reduce((acc, cur) => acc + cur.fpts, 0) -
                                    player.leagues_owned.reduce((acc, cur) => acc + cur.fpts_against, 0)
                                ) / player.leagues_owned.length
                            ).toFixed(2).toLocaleString("en-US")
                        }
                    </em>
                </td>
            </tr>
            {
                player.isLeaguesHidden === true || player.isLeaguesHidden === undefined ? null :
                    player.leagues_owned.map((league, index) =>
                        <tr key={`${league.league_name}_${index}`} className="secondary">
                            <td>
                                {
                                    props.avatar(league.league_avatar, league.league_name, 'league')
                                }
                            </td>
                            <td colSpan={3}>
                                {
                                    league.league_name
                                }
                            </td>
                            <td>
                                {
                                    league.wins
                                }
                            </td>
                            <td>
                                {
                                    league.losses
                                }
                            </td>
                            <td>
                                <em>
                                    {
                                        (league.wins / (league.wins + league.losses + league.ties)).toLocaleString("en-US", { maximumFractionDigits: 4, minimumFractionDigits: 4 })
                                    }
                                </em>
                            </td>
                            <td>
                                {
                                    league.fpts.toLocaleString("en-US")
                                }
                            </td>
                            <td>
                                {
                                    league.fpts_against.toLocaleString("en-US")
                                }
                            </td>
                            <td>
                                <em>
                                    {
                                        (league.fpts - league.fpts_against).toLocaleString("en-US")
                                    }
                                </em>
                            </td>
                        </tr>
                    )
            }

        </React.Fragment>
    )

    return <>
        <h1>PlayerShares</h1>
        <div className="scrollable">
            <table className="main playershares">
                <tbody>
                    {header}
                    {player_shares}
                </tbody>
            </table>
        </div>
    </>
}

export default PlayerShares;