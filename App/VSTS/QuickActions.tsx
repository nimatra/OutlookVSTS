/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
// import { Office } from 'Office';
import { ItemHyperlink } from  './ItemHyperlink';
import { FollowButton } from './FollowButton';
import { ReplyAllButton } from './ReplyAllButton';
import { CopyButton } from './CopyButton';
import { FollowStateTypes } from '../statesEZ';
import { connect } from 'react-redux';
import { RestButton } from './RestButton';
import * as ReactDOM from 'react-dom/server';

interface IQuickActionProps {
  VSTShtmlLink?: string;
  followState?: FollowStateTypes;
  id?: string;
  title?: string;
  workItemType?: string;
}

function mapStateToProps(state: any): IQuickActionProps {
  return {
    VSTShtmlLink: state.quickActionState.VSTShtmlLink,
    followState: state.quickActionState.followState,
    id: state.quickActionState.id,
    title: state.quickActionState.title,
    workItemType: state.quickActionState.workItemType,
  };
}

@connect(mapStateToProps)
export class QuickActions extends React.Component<IQuickActionProps, {isReady: boolean}> {

  public buildItemHyperlink(): string {
    return ReactDOM.renderToStaticMarkup(<label>
      <a target='_blank'
      href={this.props.VSTShtmlLink}
      className='ms-font-1x ms-fontWeight-light ms-fontColor-black'>
      {this.props.workItemType} {this.props.id}
      </a>
      <a className='ms-font-1x ms-fontWeight-light ms-fontColor-black'>: {this.props.title}</a>
      </label>);
  }

  public render(): React.ReactElement<Provider> {
    console.log('got to moretodo');
    let htmlString: string = this.buildItemHyperlink();

    return(
    // todo: pass in work item ID from create work item page to build hyperlink URL
      <div>
      {/*<img src='../../public/Images/logo.png' alt='VSTS Logo' height='100' width='100'/>*/}
      <h2 className='ms-font-1x ms-fontWeight-light ms-fontColor-black'>Work item successfully created!</h2>
      <ItemHyperlink workItemHyperlink={htmlString}/>
      <h2 className='ms-font-1x ms-fontWeight-light ms-fontColor-black'>Quick Actions:</h2>
      <FollowButton />
      <ReplyAllButton workItemHyperlink={htmlString}/>
      <CopyButton workItemHyperlink={htmlString}/>
      <RestButton />
      {/*<img src="./Images/logo_strip.png" alt="Footer VSTS Logo" height="100" width="400"/>*/}
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
