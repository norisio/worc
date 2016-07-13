import React, { Component } from 'react';
import { connect } from 'react-redux';
import storage from 'electron-json-storage';
import TwitterClient from '../utils/twitterClient';
import Tweet from '../components/Tweet';
import { requestGetHomeTimeline } from '../actions/homeTimeline';

class HomeTimeline extends Component {
    componentDidMount() {
        /*
        storage.get('auth', (error, data) => {
            if (error || Object.keys(data).length === 0) {
                throw error;
            } else {
                this.client = new TwitterClient(data);
                this.props.dispatch(this.client.getHomeTimeline());
            }
        });
        */
        this.props.dispatch(requestGetHomeTimeline());
    }

    returnHomeTimeline(timeline) {
        if (timeline.length > 0) {
            return timeline.map((item, index) => {
                return <Tweet tweet={item} key={index} />;
            });
        }
    }

    render() {
        if (this.props.data.gettingHomeTimeline) {
            return (
                <div className="Loading" />
            );
        }
        return (
            <ul className="List">
                {this.returnHomeTimeline(this.props.data.homeTimeline)}
            </ul>
        );
    }
}

export default connect(function (state) {
    return {
        data : state.homeTimelineReducer
    };
})(HomeTimeline);
