import React from 'react';
const LoginButton: React.FC<{ className?: string;}> = ({ className }) => {

  return (
      <div className={className}>
          <button>
              Login
          </button>
      </div>
  );
};

export default LoginButton;