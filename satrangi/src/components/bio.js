/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <>
            <div
              style={{
                display: `flex`,
                //marginBottom: rhythm(2.5),
              }}
            >
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  marginRight: rhythm(1 / 2),
                  marginBottom: 0,
                  minWidth: 50,
                  borderRadius: `100%`,
                }}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
              <p>
                Written by <strong>{author}</strong>.
              </p>
            </div>
            <nav
              style={{
                display: `flex`,
                flexWrap: `wrap`,
              }}
            >
              <a
                style={{margin: `0 .5rem .5rem 0`,}} href={`https://behance.net/${social.behance}`}
              >
                Behance
              </a>
              <a style={{margin: `0 .5rem .5rem 0`,}} href={`https://dev.to/${social.devto}`}>DevTO</a>
              <a style={{margin: `0 .5rem .5rem 0`,}} href={`https://github.com/${social.github}`}>Github</a>
              <a style={{margin: `0 .5rem .5rem 0`,}} href={`https://linkedin.com/in/${social.linkedin}`}>
                LinkedIn
              </a>
              <a style={{margin: `0 .5rem .5rem 0`,}} href={`https://${social.portfolio}`}>Portfolio</a>
              <a style={{margin: `0 .5rem .5rem 0`,}} href={`https://twitter.com/${social.twitter}`}>Twitter</a>
            </nav>
          </>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          behance
          devto
          github
          linkedin
          portfolio
          twitter
        }
      }
    }
  }
`

export default Bio
