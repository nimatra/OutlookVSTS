/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { ItemHyperlink } from  './ItemHyperlink';
// import { FollowButton } from './FollowButton';
import { ReplyAllButton } from './ReplyAllButton';
import { CopyButton } from './CopyButton';
import { IWorkItem } from '../Redux/WorkItemReducer';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom/server';

/**
 * Props for QuickActions Component
 * @interface { IQuickActionProps }
 */
interface IQuickActionProps {
  /**
   * Work item information
   * @type { IWorkItem }
   */
  workItem?: IWorkItem;
}

/**
 * Mapping state from store to component props
 * @returns { IQuickActionProps } Props for QuickActions Component
 */
function mapStateToProps(state: any): IQuickActionProps {
  return {
    workItem: state.workItem,
  };
}

/**
 * Builds the formatted work item HTML element
 * Renders all Components
 * @returns { React.ReactElement } ReactHTML div
 */
@connect(mapStateToProps)
export class QuickActions extends React.Component<IQuickActionProps, {isReady: boolean}> {
  /**
   * Builds the HTML element in the form <item type><item ID>: <item title>
   * @returns { string }
   */
  public buildItemHyperlink(): string {
    return ReactDOM.renderToStaticMarkup(
      <label>
        <a target='_blank'
          href={this.props.workItem.VSTShtmlLink}
          className='ms-font-2x ms-fontWeight-light ms-fontColor-black'>
          {this.props.workItem.workItemType} {this.props.workItem.id}
        </a>
        <a className='ms-font-2x ms-fontWeight-light ms-fontColor-black'>: {this.props.workItem.title}</a>
      </label>);
  }

  /**
   * Renders the ItemHyperlink, FollowButton, ReplyAllButton, and CopyButton Components
   * @returns { React.ReactElement } ReactHTML div
   */
  public render(): React.ReactElement<Provider> {
    let htmlString: string = this.buildItemHyperlink();
    return(
      <div>
        <h1 className='ms-font-1x ms-fontWeight-light ms-fontColor-black'>Work item successfully created!</h1>
        <ItemHyperlink workItemHyperlink={htmlString}/>
        <h1 className='ms-font-1x ms-fontWeight-light ms-fontColor-black'>Quick Actions:</h1>
        <ReplyAllButton workItemHyperlink={htmlString}/>
        <CopyButton workItemHyperlink={htmlString}/>
      </div>
    );
  }

  // work-around for Office.initialize: REMOVE LATER
  public constructor() {
    super();
    this.setState({isReady: false});
    this.Initialize = this.Initialize.bind(this);
    Office.initialize = this.Initialize;
  }


   private Initialize(): any {
    this.setState({isReady: true});
   }

  // end work-around
}
