import {Link} from '@remix-run/react';

import {AiOutlineRight} from 'react-icons/ai';

import './PoliciesMainPage.css';

const PoliciesMainPage = ({policies}) => {
  return (
    <div className="policies">
      <h1 className="policies-title">Policies</h1>
      <div className="policies-wrapper">
        {policies.map((policy) => {
          if (!policy) return null;
          return (
            <div className="policy-item" key={policy.id}>
              <Link to={`/policies/${policy.handle}`}>{policy.title}</Link>
              <AiOutlineRight />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PoliciesMainPage;
