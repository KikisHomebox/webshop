import {Link} from '@remix-run/react';
import {AiOutlineLeft} from 'react-icons/ai';

import './Policies.css';

const Policies = ({policy}) => {
  return (
    <div className="policy">
      <div className="policy-return">
        <Link to="/policies">
          <AiOutlineLeft /> Back to Policies
        </Link>
      </div>
      <h1 className="policy-title">{policy.title}</h1>
      <div dangerouslySetInnerHTML={{__html: policy.body}} />
    </div>
  );
};

export default Policies;
