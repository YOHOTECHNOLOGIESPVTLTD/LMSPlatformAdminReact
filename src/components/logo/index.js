// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
<svg width="163" height="53" {...props} viewBox="0 0 163 53" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="5.18018" width="9.24823" height="43.7831" fill="#002B38"/>
<path d="M78.7969 4.5127C83.7384 3.10415 89.5975 5.69276 91.8836 10.2945L111.832 50.4495C106.891 51.858 101.032 49.2694 98.7456 44.6677L78.7969 4.5127Z" fill="#002B38"/>
<path d="M70.0455 10.7722C72.8492 5.77347 79.5448 3.14451 85.0006 4.90026L63.153 43.8524C60.3493 48.8511 53.6537 51.4801 48.1979 49.7243L70.0455 10.7722Z" fill="#002B38"/>
<path d="M42.7734 4.60229C47.8811 4.60229 52.0217 8.74287 52.0217 13.8505V50.3601C46.914 50.3601 42.7734 46.2195 42.7734 41.1119V4.60229Z" fill="#002B38"/>
<path d="M12.7178 34.6099C16.5475 32.05 22.4857 32.4071 25.9811 35.4075L40.5788 47.938C36.749 50.4979 30.8108 50.1408 27.3154 47.1404L12.7178 34.6099Z" fill="#FF5500"/>
<path d="M44.0203 4.59818L7.47646 35.4798L7.42158 30.6928L7.36667 25.9036L27.3755 8.6939C30.1468 6.31037 34.0618 4.88552 38.1655 4.76701L44.0203 4.59818Z" fill="#002B38"/>
<rect x="105.198" y="3.70508" width="43.0762" height="47.5349" rx="7" fill="#002B38"/>
<rect x="113.211" y="10.5234" width="28.0496" height="33.5541" rx="3" fill="white"/>
<path d="M155.422 21.4146C159.607 25.6171 159.358 32.163 154.865 36.0353L140.825 48.1387C136.64 43.9362 136.889 37.3902 141.381 33.5179L155.422 21.4146Z" fill="#FF5500"/>
</svg>
  );
};

export default Logo;
