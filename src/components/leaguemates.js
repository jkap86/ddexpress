import React, { useState, useEffect } from "react";

const Leaguemates = (props) => {
    const [leaguemates, setLeaguemates] = useState([])

    const showLeagues = (leaguemate_userid) => {
        console.log(leaguemate_userid)
        let lms = leaguemates
        lms.filter(x => x.user_id === leaguemate_userid).map(lm => {
            return lm.isLeaguesHidden = lm.isLeaguesHidden === undefined ? false : !lm.isLeaguesHidden
        })
        setLeaguemates([...lms])
    }

    useEffect(() => {
        setLeaguemates(props.leaguemates)
    }, [props])

    const header = (
        <React.Fragment>
            <tbody className="main_header">
                <tr>
                    <td colSpan={2}></td>
                    <td colSpan={2}>
                        Leaguemate
                    </td>
                    <td colSpan={2}>
                        {props.username}
                    </td>
                </tr>
                <tr>
                    <td colSpan={1}>
                        Leaguemate
                    </td>
                    <td>
                        Leagues
                    </td>
                    <td>
                        Record
                    </td>
                    <td>
                        WinPCT
                    </td>
                    <td>
                        Record
                    </td>
                    <td>
                        WinPCT
                    </td>
                </tr>
            </tbody>
        </React.Fragment>
    )

    const leaguemates_display = leaguemates.filter(x => x.user_id !== props.user_id).map((leaguemate, index) =>
        <React.Fragment key={`${leaguemate.user_id}_${index}`}>
            <tr
                className={leaguemate.isLeaguesHidden === false ? "main_row_active clickable" : "main_row clickable"}
                style={{
                    zIndex: index
                }}
                onClick={() => showLeagues(leaguemate.user_id)}
            >
                <td colSpan={1}>
                    <span className="image">
                        {
                            props.avatar(leaguemate.avatar, leaguemate.display_name, 'user')
                        }
                        <strong>
                            {
                                leaguemate.display_name
                            }
                        </strong>
                    </span>
                </td>
                <td>
                    {
                        leaguemate.leagues.length
                    }
                </td>
                <td>
                    {
                        leaguemate.leagues.reduce((acc, cur) => acc + cur.lmroster.settings.wins, 0)
                    }
                    -
                    {
                        leaguemate.leagues.reduce((acc, cur) => acc + cur.lmroster.settings.losses, 0)
                    }
                </td>
                <td>
                    <em>
                        {
                            (leaguemate.leagues.reduce((acc, cur) => acc + cur.lmroster.settings.wins, 0) /
                                leaguemate.leagues.reduce((acc, cur) => acc + cur.lmroster.settings.wins + cur.lmroster.settings.losses, 0)).toLocaleString("en-US", { maximumFractionDigits: 4, minimumFractionDigits: 4 })
                        }
                    </em>
                </td>
                <td>
                    {
                        leaguemate.leagues.reduce((acc, cur) => acc + cur.roster.settings.wins, 0)
                    }
                    -
                    {
                        leaguemate.leagues.reduce((acc, cur) => acc + cur.roster.settings.losses, 0)
                    }
                </td>
                <td>
                    <em>
                        {
                            (leaguemate.leagues.reduce((acc, cur) => acc + cur.roster.settings.wins, 0) /
                                leaguemate.leagues.reduce((acc, cur) => acc + cur.roster.settings.wins + cur.roster.settings.losses, 0)).toLocaleString("en-US", { maximumFractionDigits: 4, minimumFractionDigits: 4 })
                        }
                    </em>
                </td>
            </tr>
        </React.Fragment>
    )

    return <>
        <h1>Leaguemates</h1>
        <div className="scrollable">
            <table className="main leaguemates">
                <colgroup>
                    <col span={2} />
                </colgroup>
                <colgroup className="leaguemate">
                    <col span={2} />
                </colgroup>
                <colgroup className="leaguemate">
                    <col span={2} />
                </colgroup>
                {header}
                <tbody>
                    {leaguemates_display}
                </tbody>
            </table>
        </div>
    </>
}

export default Leaguemates;