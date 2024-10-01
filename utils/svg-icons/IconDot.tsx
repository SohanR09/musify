// icon:dot | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function IconDot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  );
}

export default IconDot;
