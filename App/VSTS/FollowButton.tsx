/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { changeFollow } from '../actionsEZ';
import { connect } from 'react-redux';
import { FollowStateTypes } from '../statesEZ';

let buttonText: string = '';
let isDisabled: boolean = false;
let iconType: string = 'ms-Icon ms-Icon--eye';

interface IFollowButtonProps {
  dispatch?: any;
  followState?: FollowStateTypes;
}

function mapStateToProps(state: any): IFollowButtonProps {
  return {
    followState: state.quickActionState.followState,
  };
}

@connect(mapStateToProps)
export class FollowButton extends React.Component<IFollowButtonProps, {}> {
  public render(): React.ReactElement<Provider> {
    console.log('got to followbutton, followstate: ' + this.props.followState);
    switch (this.props.followState) {
      case FollowStateTypes.Followed:
        buttonText = 'Following';
        break;
      case FollowStateTypes.Unfollowed:
        buttonText = 'Follow';
        break;
      default:
        break;
    }

    return(
      <div>
        <button className='ms-Button' id='follow' disabled={isDisabled} onClick = {this.handleClick}>
        <span className={iconType} ></span>
        {'   ' + buttonText}
        </button>
        <h1></h1>
      </div>
    );
  }

  private handleClick: any = (event) => {
    switch (this.props.followState) {
      case FollowStateTypes.Followed:
        this.props.dispatch(changeFollow(FollowStateTypes.Unfollowed));
        buttonText = 'Following';
        isDisabled = false;
        break;
      case FollowStateTypes.Unfollowed:
        this.props.dispatch(changeFollow(FollowStateTypes.Followed));
        buttonText = 'Follow';
        isDisabled = false;
        break;
      default: // when FollowStateTypes is flagged as Request
        isDisabled = true;
        break;
    }
  }
 }
