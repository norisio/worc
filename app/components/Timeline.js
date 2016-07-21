import React, { Component } from 'react';
import Tweet from './Tweet';
import Modal from 'react-awesome-modal';
import { requestPostFavoritesCreate, requestPostFavoritesDestroy } from '../actions/favorites';
import { requestPostRetweet } from '../actions/retweet';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retweetModal : false,
            tweetId      : ''
        };
    }

    /*
    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps);
    }*/

    postFavorites(tweetId, favorited) {
        if (favorited) {
            this.props.dispatch(requestPostFavoritesDestroy(tweetId));
        } else {
            this.props.dispatch(requestPostFavoritesCreate(tweetId));
        }
    }

    postRetweet() {
        this.closeRetweetModal();
        this.props.dispatch(requestPostRetweet(this.state.tweetId));
    }

    popupRetweetModal(tweetId) {
        this.setState({
            retweetModal : true,
            tweetId      : tweetId
        });
    }

    closeRetweetModal() {
        this.setState({
            retweetModal : false
        });
    }

    returnTimeline(timeline) {
        if (timeline.length > 0) {
            return timeline.map((item, index) => {
                return <Tweet tweet={item} key={index} dispatch={this.props.dispatch} postFavorites={this.postFavorites.bind(this)} postRetweet={this.popupRetweetModal.bind(this)} />;
            });
        }
    }

    render() {
        if (this.props.gettingTimeline) {
            return (
                <div className="List">
                    <div className="Loading" />
                </div>
            );
        }
        return (
            <div>
                <ul className="List">
                    {this.returnTimeline(this.props.timeline)}
                </ul>
                <Modal visible={this.state.retweetModal} width="300" height="120" effect="fadeInDown">
                    <div className="Modal">
                        <p className="Modal__title">Are you sure you wanna retweet?</p>
                        <div className="Modal__actions mt20px">
                            <input className="Button Button__submit" type="button" value="retweet" onClick={this.postRetweet.bind(this)} />
                            <a className="ml20px" href="javascript:void(0);" onClick={this.closeRetweetModal.bind(this)}>cancel</a>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}