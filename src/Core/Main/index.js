import { useState } from 'react';

import Landing from '../../Core/Landing';
import Client from '../../Core/Client';

function Main(){
    const [user, setUser] = useState(null);
    setUser(null);

    switch (user) {
        case null:
                return <Landing/>;
        default:
                return <Client/>;
    }
}

export default Main;