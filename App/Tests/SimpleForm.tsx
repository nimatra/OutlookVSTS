import * as React from 'react';
import { reduxForm } from 'redux-form';

export const fields = ['firstName'];

export class SimpleForm extends React.Component<any, any> {

  render() {
    const {fields: {firstName}, handleSubmit} = this.props;
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" {...firstName}/>
          </div>
        </div>

        <div>
          <button>
            Submit
          </button>
  
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'simpleform',
  fields
})(SimpleForm);