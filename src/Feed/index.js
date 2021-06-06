import React, {Component} from 'react';
import Uploader from '../Uploader';
import Content from '../Content';

import './index.css';

class Feed extends Component{
    render(){
        return(
            <div className='feedContainer'>
                <div className='feedDiv'>
                    <h2>Feed</h2>
                    <Uploader/>
                    <div className='contentDiv'>
                        <Content userpic='https://scontent.ftij3-1.fna.fbcdn.net/v/t1.6435-9/118855829_1190851211290913_7150096692545198690_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=p2AZLERo6EUAX9BDWcS&_nc_ht=scontent.ftij3-1.fna&oh=8423cd9c1f41e366ac1bd28b2f7532b7&oe=60D35A73' username='Oscar' date='Wednesday 26/05/21' datatext='This is a simple sample post'/>
                        <Content userpic='https://scontent.ftij3-1.fna.fbcdn.net/v/t1.18169-9/199863_192565944115791_7580117_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=arL24uRzTvkAX-DBzEm&_nc_ht=scontent.ftij3-1.fna&oh=93a9ec0e56878804bf5ff46b161b7e92&oe=60D5AD79' username='Deborah' date='Wednesday 26/05/21' datatext='This is a photo sample post' dataimage='https://scontent.ftij3-1.fna.fbcdn.net/v/t1.18169-9/26090_102375736468146_7348343_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=de6eea&_nc_ohc=MaDgTdZq_-EAX-j7EfI&_nc_ht=scontent.ftij3-1.fna&oh=d27fc59d9a723c65311131f22e4b137b&oe=60D48F1A'/>
                        <Content userpic='https://scontent.ftij3-1.fna.fbcdn.net/v/t1.6435-9/118855829_1190851211290913_7150096692545198690_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=p2AZLERo6EUAX9BDWcS&_nc_ht=scontent.ftij3-1.fna&oh=8423cd9c1f41e366ac1bd28b2f7532b7&oe=60D35A73' username='Oscar' date='Wednesday 26/05/21' datatext='This is a video sample post' datavideo='https://vod-progressive.akamaized.net/exp=1622088472~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3307%2F18%2F466539623%2F2071024494.mp4~hmac=68aafce8caf481ec9f3a5fe192bb4ab65d41abca87fd990c4dee96bd3333a04d/vimeo-prod-skyfire-std-us/01/3307/18/466539623/2071024494.mp4?filename=pexels-tima-miroshnichenko-5561640.mp4'/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;