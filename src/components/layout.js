import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Navigation from "./Navigation";
import Lightbox from "react-image-lightbox";

const initialState = {
  open: false,
  currentIndex: 0,
  images: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'open':
      return {
        open: true,
        currentIndex: 0,
        images: action.payload
      };
    case 'close':
      return {
        ...initialState
      };
    case 'prevSlide':
      return {
        open: state.open,
        currentIndex: state.currentIndex-1 >= 0 ? state.currentIndex-1 : state.currentIndex,
        images: state.images
      }
    case 'nextSlide':
      return {
        open: state.open,
        currentIndex: state.currentIndex+1 < state.images.length ? state.currentIndex+1 : state.currentIndex,
        images: state.images
      }
    default:
      throw new Error();
  }
}

export const LightBox = React.createContext(initialState);

const Layout = ({isHomePage, children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const logo = useStaticQuery(graphql`
    query Main {
      wpMediaItem(slug: {eq: "logo"}) {
        gatsbyImage(width: 200)
      }
    }
  `);
  console.log(logo);

  return (
    <LightBox.Provider value={[state, dispatch]}>
      <div className="global-wrapper" data-is-root-path={isHomePage}>
        <header className="global-header">
          <Link to="/">
            {/* <GatsbyImage image={logo} alt="Logo"/> */}
          </Link>
          <Navigation/>
        </header>

        <main style={{padding: '10px'}}>{children}</main>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
          {` `}
          And <a href="https://wordpress.org/">WordPress</a>
        </footer>
        {state.open && <Lightbox
          mainSrc={state.images[state.currentIndex]}
          nextSrc={state.images[(state.currentIndex + 1) % state.images.length]}
          prevSrc={state.images[(state.currentIndex + state.images.length - 1) % state.images.length]}
          onCloseRequest={() => dispatch({type:"close"})}
          onMovePrevRequest={() =>
            dispatch({type:"nextSlide"})
          }
          onMoveNextRequest={() =>
            dispatch({type:"prevSlide"})
          }
        />}
      </div>
    </LightBox.Provider>
  )
}

export default Layout
