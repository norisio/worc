import { connect } from 'react-redux';
import App from '../../components/Modules/App/App';
import { requestStreamUser } from '../../actions/userStream';
import { resetTimeline } from '../../actions/timeline';

const mapStateToProps = (state, ownProps) => ({
  pathname: ownProps.location.pathname === '/' ? '/homeTimeline' : ownProps.location.pathname
});

const mapDispatchToProps = dispatch => ({
  requestStreamUser() {
    dispatch(requestStreamUser(dispatch));
  },
  resetTimeline() {
    dispatch(resetTimeline(dispatch));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
