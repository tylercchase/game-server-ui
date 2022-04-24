import { useEffect, useState } from 'react';
import './Game.css';
import { Game } from './models/Game';
function GameBlock(props: { game: Game }) {
    const [status, setStatus] = useState("STAGING");
    useEffect(() => {
        fetch(props.game.urls.status).then(res => res.json()).then(data => {
            setStatus(data['status']);
        });
    }, [props.game.urls.status]);
    function handleClick(url: string) {
        setStatus('STAGING');
        fetch(url).then(res => res.json()).then(res => setStatus(res['status']));
    }
    return (
        <div className="game">
            <h3>{props.game.name}</h3>
            <div className="game-status">
                <span className={`status ${status}`}>{status}</span>
            </div>
            <div className="game-button">
                {status === 'RUNNING' &&
                    <button onClick={() => handleClick(props.game.urls.stop)}>Stop</button>
                }
                {status === 'TERMINATED' &&
                    <button onClick={() => handleClick(props.game.urls.start)}>Start</button>
                }
            </div>

        </div>
    );
}

export default GameBlock;
