import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Shared Unified Button Component for Saheli AI
 * Rectangular, ~2px radius (non-pill), hand-drawn/editorial aesthetic
 * Base style: Maroon (#530505) fill with Cream (#FCE2A3) text,
 * hovering to Terracotta (#DE812B) with white text.
 */
const Button = ({
  to,
  onClick,
  children,
  variant = 'primary',
  showArrow = true,
  className = '',
  type = 'button',
  ariaLabel,
  ...props
}) => {
  const buttonClasses = `saheli-btn saheli-btn-${variant} ${className}`.trim();

  const content = (
    <>
      <span className="saheli-btn-text">{children}</span>
      {showArrow && <span className="saheli-btn-arrow" aria-hidden="true">&rarr;</span>}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        onClick={onClick}
        aria-label={ariaLabel}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
