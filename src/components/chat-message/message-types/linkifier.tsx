import React from 'react';
import Linkify from 'linkify-react';

interface LinkifierProps {
  message: string | undefined;
}

const URL_REGEX = /^(https?:\/\/|www\.)[a-zA-ZõäöüÕÄÖÜ0-9.-]+[\\/]?$/;

const Linkifier: React.FC<LinkifierProps> = ({ message }) => (
  <div>
    <Linkify
      options={{
        attributes: { target: '_blank' },
        defaultProtocol: 'https',
        validate: {
          url: (value: string) => URL_REGEX.test(value),
          email: false,
        },
      }}
    >
      {message || ''}
    </Linkify>
  </div>
);

export default Linkifier;
