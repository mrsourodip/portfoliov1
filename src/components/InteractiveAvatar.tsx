import React, { useEffect, useRef } from 'react';

const InteractiveAvatar: React.FC = () => {
  const leftEyeballRef = useRef<SVGCircleElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightEyeballRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const leftEyeball = leftEyeballRef.current;
      const leftPupil = leftPupilRef.current;
      const rightEyeball = rightEyeballRef.current;
      const rightPupil = rightPupilRef.current;

      if (!leftEyeball || !leftPupil || !rightEyeball || !rightPupil) return;

      // Get dimensions for left eye
      const leftEyeArea = leftEyeball.getBoundingClientRect();
      const leftPupilArea = leftPupil.getBoundingClientRect();
      const R_left = leftEyeArea.width / 2;
      const r_left = leftPupilArea.width / 2;
      const centerX_left = leftEyeArea.left + R_left;
      const centerY_left = leftEyeArea.top + R_left;

      // Get dimensions for right eye
      const rightEyeArea = rightEyeball.getBoundingClientRect();
      const rightPupilArea = rightPupil.getBoundingClientRect();
      const R_right = rightEyeArea.width / 2;
      const r_right = rightPupilArea.width / 2;
      const centerX_right = rightEyeArea.left + R_right;
      const centerY_right = rightEyeArea.top + R_right;

      // Calculate angles for both eyes
      const x_left = e.clientX - centerX_left;
      const y_left = e.clientY - centerY_left;
      const theta_left = Math.atan2(y_left, x_left);
      const angle_left = (theta_left * 180) / Math.PI + 360;

      const x_right = e.clientX - centerX_right;
      const y_right = e.clientY - centerY_right;
      const theta_right = Math.atan2(y_right, x_right);
      const angle_right = (theta_right * 180) / Math.PI + 360;

      // Apply transformations
      leftPupil.style.transform = `translateX(${R_left - r_left}px) rotate(${angle_left}deg)`;
      leftPupil.style.transformOrigin = `${r_left}px center`;

      rightPupil.style.transform = `translateX(${R_right - r_right}px) rotate(${angle_right}deg)`;
      rightPupil.style.transformOrigin = `${r_right}px center`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="interactive-avatar">
      <div className="face">
        <div className="eyes-container">
          <svg width="24" height="24" className="eye left-eye">
            <circle
              ref={leftEyeballRef}
              cx="12"
              cy="12"
              r="12"
              fill="white"
              className="eyeball"
            />
            <circle
              ref={leftPupilRef}
              cx="12"
              cy="12"
              r="6"
              fill="#333"
              className="pupil"
            />
          </svg>
          <svg width="24" height="24" className="eye right-eye">
            <circle
              ref={rightEyeballRef}
              cx="12"
              cy="12"
              r="12"
              fill="white"
              className="eyeball"
            />
            <circle
              ref={rightPupilRef}
              cx="12"
              cy="12"
              r="6"
              fill="#333"
              className="pupil"
            />
          </svg>
        </div>
        <div className="mouth"></div>
      </div>
    </div>
  );
};

export default InteractiveAvatar; 