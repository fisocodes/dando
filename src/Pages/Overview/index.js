import Data from '../../Components/Data';
import Clock from '../../Components/Clock';
import Weather from '../../Components/Weather';

import Star from '../../Components/Star';
import Dust from '../../Components/Dust';

import './index.scss';

function Overview(){

    return(
        <div id="overviewContainer" className="overview-container">
            
            <div className="title-section">
                <h1>D&amp;O</h1>
                <h2>Welcome to our website</h2>
                <h2 className='arrow-pointer'>&#62;</h2>
            </div>
            <div className="description-section">
                <h2>What is D&amp;O ?</h2>
                <p>
                    D&amp;O is Deborah's and Oscar's album, where they upload photos,
                    videos, states, message and call each other, for remembering every
                    lovely thing they do.
                </p>
            </div>
            <div className="widget-section">
                <Clock location="Sydney" timezone="Australia/Sydney"/>
                <Clock location="Ensenada" timezone="America/Tijuana"/>
                <Weather city='Cabramatta' country='AU'/>
                <Weather city='Ensenada' country='MX'/>
            </div>
            <div className="data-section">
                <Data icon='question_answer' icondesc='Messages icon' title='Messages' quantity='142252'/>
                <Data icon='call' icondesc='Calls icon' title='Calls' quantity='45636'/>
                <Data icon='image' icondesc='Photos icon' title='Photos' quantity='13421'/>
                <Data icon='play_arrow' icondesc='Videos icon' title='Videos' quantity='69675'/>
                <Data icon='article' icondesc='Posts icon' title='Posts' quantity='24634'/>
                <Data icon='leaderboard' icondesc='Total icon' title='Total stuff' quantity='32535'/>
            </div>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Dust color="deeppink" gradID="1"/>
            <Dust color="deeppink" gradID="1"/>
            <Dust color="deeppink" gradID="1"/>
            <Dust color="deeppink" gradID="1"/>
            <Dust color="deeppink" gradID="1"/>
            <Dust color="deepskyblue" gradID="2"/>
            <Dust color="deepskyblue" gradID="2"/>
            <Dust color="deepskyblue" gradID="2"/>
            <Dust color="deepskyblue" gradID="2"/>
            <Dust color="deepskyblue" gradID="2"/>
            <Dust color="deepskyblue" gradID="2"/>
        </div>
    );
}

export default Overview;