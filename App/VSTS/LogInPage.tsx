import * as React from 'react';
import { Provider } from 'react-redux';
import { Office } from 'Office';

export class VSTS extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: center
    };

    var style_button = {
      background-color: rgb(0,122,204),//save button blue
      text-align: center,
      text-color: rgb(255,255,255),
      font: "Arial", sans-serif, 12px,
      align: center
    };

    var style_section = {
      color: rgb(104,33,122), //VS purple
      font: "Arial", sans-serif, 12px
    };

    var style_signin = {
       color: rgb(104,33,122), //VS purple
       font: "Arial", sans-serif, 12px

    };

    var style_text1 = {
       color: rgb(30,30,30), //black
       font: "Arial", sans-serif, 12px

    };

    var style_text2 = {
      color: rgb(157,157,157), //dark gray
      font: "Arial", sans-serif, 12px
    };

    var style_bottomlogo = {
      width:500px;
      height:120px;
      align: center
    };

    console.log('got to vsts');
    return (<div>
            <img src="./logo.png" alt="VSLogo" style = {style_img}>
            </div>
            <div>
              <button id="msgprops" class="ms-Button stretch">
                <span class="ms-Button-label" align='center' style = {style_button}> Create New Account </span>
              </button>
            </div>
            <div>
              <p style = {style_text1}> Already have an account?     <a href="https://login.live.com/login.srf?wa=wsignin1.0&wtrealm=https%3a%2f%2faccesscontrol.windows.net%2f&wreply=https%3a%2f%2ftfsprodch1acs01.accesscontrol.windows.net%2fv2%2fwsfederation&wp=MBI_FED_SSL&wctx=cHI9d3NmZWRlcmF0aW9uJnJtPWh0dHBzJTNhJTJmJTJmYXBwLnZzc3BzLnZpc3VhbHN0dWRpby5jb20lMmYmcnk9aHR0cHMlM2ElMmYlMmZhcHAudnNzcHMudmlzdWFsc3R1ZGlvLmNvbSUyZl9zaWduZWRpbiUzZnJlYWxtJTNkYXBwLnZzc3BzLnZpc3VhbHN0dWRpby5jb20lMjZwcm90b2NvbCUzZHdzZmVkZXJhdGlvbiUyNmNhY2hlX2tleSUzZGxjdHZ5ZTdwM3ltb2plNGF5YmFjdzViZG1mcXUycm16YXBzM2VjNXNyNm00bmU0aGt2dmE1&cbcxt=eyJodCI6MywiaGlkIjoiYTVjYTM1ZWItMTQ4ZS00Y2NkLWJiYjMtZDMxNTc2ZDc1OTU4IiwicXMiOnsicmVhbG0iOiJhcHAudnNzcHMudmlzdWFsc3R1ZGlvLmNvbSIsInJlcGx5X3RvIjoiaHR0cHM6Ly9hcHAudnNzcHMudmlzdWFsc3R1ZGlvLmNvbS9nby9wcm9maWxlP2FjY291bnQ9Zmlyc3QmbWt0PWVuLXVzJnd0Lm1jX2lkPXNlbV9tcXp2YWZzcSZjYW1wYWlnbj1zZW1fbXF6dmFmc3EifSwicnIiOiIiLCJ2aCI6IiIsImN2IjoiIiwiY3MiOiIifQ2" style = {style_signin}>Sign in</a> </p>
            </div>
            <div>
              <h1 style = {style_section}>Create work items</h1>
              <p style = {style_text2}> Do you have an email thread that should be turned into a work item or has your boss sent you a list of things to do? Create work items directly from your email.</p>
              <h2 style = {style_section}>Respond to comments</h2>
              <p style = {style_text2}> When you are mentioned in a comment thread, post a reply without clicking away from the email notification.</p>
              <h3 style = {style_section}>View details of a work item</h3>
              <p style = {style_text2}> If a work item number is present in the email body, details will be displayed in the adjacent task pane.</p>
          </div>
          <div>
          <img src="./logo_strip.png" alt="VSOLogo" style={style_bottomlogo}>
          </div>);
  }
 }

 /*

 */