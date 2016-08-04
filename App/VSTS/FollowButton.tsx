/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { changeFollowAction } from '../actionsEZ';
import { connect } from 'react-redux';
import { FollowStateTypes } from '../statesEZ';

/**
 * Props for FollowButton Component
 * @interface { IFollowButtonProps }
 */
interface IFollowButtonProps {
  /**
   * Reduc dispatch method
   * @type { any }
   */
  dispatch?: any;
  /**
   * Follow state of work item
   * @type { FollowStateTypes }
   */
  followState?: FollowStateTypes;
}

/**
 * Mapping state from store to component props
 * @returns { IFollowButtonProps } Props for FollowButton Component
 */
function mapStateToProps(state: any): IFollowButtonProps {
  return {
    followState: state.workItemState.followState,
  };
}

/**
 * Renders a button that follows or unfollows a work item on-click
 * The button switches between states in the FollowStateTypes enum
 * Reads and writes to Store 
 * @class { FollowButton }
 */
@connect(mapStateToProps)
export class FollowButton extends React.Component<IFollowButtonProps, {}> {
  /**
   * Renders the FollowButton Component and reads IFollowButtonProps
   * Switches on the followState to change buttonText and isDisabled
   * @returns { React.ReactElement } ReactHTML div
   */
  public render(): React.ReactElement<Provider> {
    /**
     * Text displayed in the button HTML tag
     */
    let buttonText: string = '';
    /**
     * Type of Office icon to be displayed based on followState
     */
    const iconType: string = 'ms-Icon ms-Icon--eye';
    switch (this.props.followState) {
      case FollowStateTypes.Followed:
        buttonText = 'Following';
        break;
      default:
        buttonText = 'Follow';
        break;
    }
    return(
      <div>
        <button className='ms-Button' id='follow' /*disabled={isDisabled}*/ onClick = {this.handleClick}>
          <a className={iconType} />
          {'   ' + buttonText}
        </button>
        <br/><br/>
      </div>
    );
  }

  /**
   * Handles the button click and depending on followState, changes buttonText and isBisabled
   * When a REST call is made, followState is flagged as Request
   * @private
   */
  private handleClick: () => void = () => { // so should this logic appear in the action instead?
    const ele: any = document.getElementById('follow');
    ele.disabled = true;
    /**
     * TODO: 
     * changeFollowState(args....callback {onSuccess: this.props.dispatch(changeFollowAction(newState)) onFail: dispatch(oldState)})
     */
    this.props.dispatch(changeFollowAction(this.props.followState));
  }
 }
