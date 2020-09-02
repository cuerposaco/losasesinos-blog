import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from "gatsby-image"
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Grid, Avatar } from '@material-ui/core'

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`
  const readingTime = readingTimeHelper(post)

  return (
    <Grid container className="post-card">
      <Grid item xs={6} xl={6}>
        <header className="post-card-header">
          {post.feature_image &&
            <Link to={url}>
              <div className="post-card-image" style={{
                backgroundImage: `url(${post.feature_image})`,
              }}>
                <img src={post.feature_image}></img>
              </div>
            </Link>
          }
        </header>
      </Grid>
      <Grid item xs={6} xl={6}>
        <div className='post-card-content'>
          <Link to={url}>
            <h2 className="post-card-title">{post.title}</h2></Link>
          {post.tags && <div className="post-card-tags"> <Tags post={post} visibility="public" autolink={true} /></div>}
          {post.featured && <span>Featured</span>}
          <section className="post-card-excerpt">{post.excerpt}</section>
          <footer className="post-card-footer">
            <div className="post-card-footer-left">
              <Grid container spacing={2}>
                <Grid item xs={null}>
                  <Avatar
                    variant="square"
                    alt={post.primary_author.name}
                    src={post.primary_author.profile_image || '/images/icons/avatar.svg'}
                  />
                </Grid>
                <Grid item xs={null}>
                  <div><span>{post.primary_author.name}</span></div>
                  <div>{post.published_at_pretty && <span>{post.published_at_pretty}</span>} ({readingTime})</div>
                </Grid>
              </Grid>
            </div>
          </footer>
        </div>
      </Grid>
    </Grid>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    published_at_pretty: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default PostCard
