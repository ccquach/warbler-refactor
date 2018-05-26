import React from 'react';
import { spring, TransitionMotion } from 'react-motion';

const SPRING_CONFIG = { stiffness: 140, damping: 14 };

const willEnter = () => ({
  scale: 0
});

const willLeave = () => ({
  scale: 0
});

const getStyles = () => ({
  scale: spring(1, SPRING_CONFIG)
});

const toCSS = scale => ({
  transform: `scale3d(${scale}, ${scale}, ${scale})`,
  opacity: scale
});

const Scale = ({ children: child, el }) => (
  <TransitionMotion
    styles={child ? [{ key: el, style: getStyles(), data: { child } }] : []}
    willEnter={willEnter}
    willLeave={willLeave}
  >
    {interpolated => (
      <div>
        {interpolated.map(({ key, style, data }) => (
          <div key={`${key}-transition`} style={toCSS(style.scale)}>
            {data ? data.child : null}
          </div>
        ))}
      </div>
    )}
  </TransitionMotion>
);

export default Scale;
