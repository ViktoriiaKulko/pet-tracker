import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    /* color */
    --primary-color: #fff;

    --secondary-color: #000;
    --secondary-color-50: rgba(0, 0, 0, 0.5);
    --secondary-color-25: rgba(0, 0, 0, 0.25);
    --secondary-color-12: rgba(0, 0, 0, 0.12);

    --accent-primary-color: #aa80ff;
    --accent-secondary-color: #ff9e80;

    --error-color: #d32f2f;

    --neutral-color-100: #f5f5f5;
    --neutral-color-200: #ebebeb;
    --neutral-color-300: #e0e0e0;

    /* width */
    --app-width: 1024px;
  }

/* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
*/

* {
  box-sizing: border-box;
}

html,
body {
  min-height: 100%;
  height: 100%;
  overflow: hidden; 
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--neutral-color-200);
	line-height: 1;

  /* custom styles for MaterialUI Select  */
  & .MuiPaper-root {
    border-radius: 0 0 4px 4px !important;
    box-shadow: 0px 2px 4px var(--secondary-color-25);
    margin-top: 4px;
  }
}

ol, ul {
	list-style: none;
}

blockquote, q {
	quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* root styles */
#root {
  max-width: var(--app-width);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;
  padding: 8px 0;
}
`;
