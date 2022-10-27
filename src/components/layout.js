import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
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
  const data = useStaticQuery(graphql`
    query Main {
      wp {
        generalSettings {
          title
        }
        localImage {
          childImageSharp {
            gatsbyImageData(width: 200, formats: WEBP, quality: 100, placeholder: NONE)
          }
        }
      }
    }
  `);

  return (
    <LightBox.Provider value={[state, dispatch]}>
      <div className="global-wrapper" data-is-root-path={isHomePage}>
        <header className="global-header">
          <Link to="/">
            {
              data.wp.localImage?.childImageSharp?.gatsbyImageData ?
                <GatsbyImage image={data.wp.localImage?.childImageSharp?.gatsbyImageData} alt="Logo"/>
              :
                data.wp.generalSettings.title
            }
          </Link>
          <Navigation/>
        </header>

        <main style={{padding: '10px'}}>{children}</main>

        <footer>
          © {new Date().getFullYear()} for c3sare.pl
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
