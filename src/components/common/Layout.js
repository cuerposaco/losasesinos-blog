import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import CookieConsent, { Cookies } from 'react-cookie-consent';

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
  const site = data.allGhostSettings.edges[0].node
  const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
  const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
  const instagramUrl = 'https://www.instagram.com/losasesinosdelcomic/'

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>

      <div className="viewport">

        <div className="viewport-top">
          {/* The main header section on top of the screen */}
          <header className="site-head" style={{ ...site.cover_image && { backgroundImage: `url(${site.cover_image})` } }}>
            <div className="container">
              <div className="site-mast">
                <div className="site-mast-left">
                  {/* <Link to="/">
                    {site.logo ?
                      <img className="site-logo" src={site.logo} alt={site.title} />
                      : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                    }
                  </Link> */}
                </div>
                <div className="site-mast-right">
                  {site.twitter && <a href={twitterUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                  {site.facebook && <a href={facebookUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                  <a href={instagramUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/instagram.svg" alt="Instagram" /></a>
                  <a className="site-nav-item" href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`} target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a>
                </div>
              </div>
              {!isHome ? null :
                <Link to="/">
                  <div className="site-banner">
                    <h1 className="site-banner-title">{site.title}</h1>
                    <p className="site-banner-desc">{site.description}</p>
                  </div>
                </Link>
              }
              <nav className="site-nav">
                <div className="site-nav-left">
                  {/* The navigation items as setup in Ghost */}
                  <Navigation data={site.navigation} navClass="site-nav-item" />
                </div>
                <div className="site-nav-right">
                  <a href={instagramUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/instagram.svg" alt="Instagram" /></a>
                  {/* <a className="site-nav-item" href={`https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/`} target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a> */}
                  {/* <Link className="site-nav-button" to="/about">About</Link> */}
                </div>
              </nav>
            </div>
          </header>

          <main className="site-main">
            {/* All the main content gets inserted here, index.js, post.js */}
            {children}
          </main>

        </div>

        <div className="viewport-bottom">
          {/* The footer at the very bottom of the screen */}
          {/* <CookieConsent
            location={"bottom"}
            buttonText={"Accept"}
            declineButtonText={"Decline"}
            cookieName={"gatsby-plugin-google-analytics-gdpr_cookies-enabled"}
            overlay={true}
            debug
          >
            <h1>This site uses cookies ...</h1>
          </CookieConsent> */}
          <CookieConsent
            location="bottom"
            buttonText="¡Adelante!"
            declineButtonText="No, gracias"
            cookieName="gdpr_viewed"
            style={{ background: "#000", padding: "0 4vw" }}
            buttonStyle={{ color: "#000", fontSize: "1em", fontWeight: "800" }}
            declineButtonStyle={{ background: 'none', fontSize: "0.8em" }}
            enableDeclineButton
            flipButtons
            onAccept={() => {
              Cookies.set('gatsby-plugin-google-analytics-gdpr_cookies-enabled', true);
              Cookies.set('gdpr_viewed', true);
            }}
            onDecline={() => {
              Cookies.set('gatsby-plugin-google-analytics-gdpr_cookies-enabled', false);
              Cookies.set('gdpr_viewed', false);
            }}
          >
            <span style={{ fontFamily: "'Neucha', serif", fontSize: "2em", lineHeight: "1.2em", display: "block", marginBottom: "1em" }}>Queremos saber lo que te gusta y ..., sí, usamos cookies para ello; así que, tenemos que preguntarte si aceptas que lo hagamos.</span>
            <span style={{ fontFamily: "'Roboto', serif", fontSize: "0.9em", lineHeight: "1.4em", display: "block" }}>Aceptando nos ayudas a mejorar, pero si no quieres, podrás seguir difrutando de los contenidos de la misma manera pero sin enviar información sobre tu visita.</span>
          </CookieConsent>
          <footer className="site-foot">
            <div className="site-foot-nav container">
              <div className="site-foot-nav-left">
                <img width="200px" src={`https://raw.githubusercontent.com/cuerposaco/losasesinosdelcomic-assets/master/logo_horizontal.png`}></img>
              </div>
              <div className="site-foot-nav-right">
                <div>
                  <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                </div>
                <Link to="/">{site.title}</Link> © {(new Date(Date.now())).getFullYear()}
                <a href="mailto:hello@losasesinosdelcomic.com">hello@losasesinosdelcomic.com</a>
                <div>
                  <a href={instagramUrl} className="site-nav-item invert" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/instagram.svg" alt="Instagram" /></a>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
)

export default DefaultLayoutSettingsQuery
