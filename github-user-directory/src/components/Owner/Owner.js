import React from 'react'
import './Owner.css'

const Owner = (props) =>
  <>
    <div className="card d-flex flex-row align-items-center thumb">
      <img
        className="card-img-top"
        src={props.thumb}
        alt={props.title}
      />
      <div className="card-body">
        <h5 className="card-title m-0 p-0 text-light">
          {props.user.name}
        </h5>
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className="my-2 btn btn-sm btn-dark"
        >
          {props.children}
        </a>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-dark table-sm table-bordered table-hover table-light m-0 p-0">
        {
          (props.user.name && props.user.bio) &&
          <thead>
            <tr>
              <th scope="row">{props.user.name}</th>
              <td colSpan="7">{props.user.bio}</td>
            </tr>
          </thead>
        }
        <tbody>
          {
            props.user.login &&
            <tr>
              <th scope="row">Username</th>
              <td colSpan="7">{props.user.login}</td>
            </tr>
          }
          {
            props.user.email &&
            <tr>
              <th scope="row">Email</th>
              <td colSpan="7"><a href={props.user.email} target="_blank" rel="noopener noreferrer">{props.user.email}</a></td>
            </tr>
          }
          {
            props.user.location &&
            <tr>
              <th scope="row">Location</th>
              <td colSpan="7">{props.user.location}</td>
            </tr>
          }
          {
            props.user.company &&
            <tr>
              <th scope="row">Company</th>
              <td colSpan="7">{props.user.company}</td>
            </tr>
          }
          {
            (props.user.created_at && props.user.updated_at) &&
            <tr>
              <th scope="row">Joined</th>
              <td colSpan="3">{new Date(props.user.created_at).toLocaleDateString(
                "en-CA"
              )}, {new Date(props.user.created_at).toLocaleTimeString(
                "en-CA"
              )}</td>
              <th scope="row">Last seen</th>
              <td colSpan="3">{new Date(props.user.updated_at).toLocaleDateString(
                "en-CA"
              )}, {new Date(props.user.updated_at).toLocaleTimeString(
                "en-CA"
              )}</td>
            </tr>
          }
          {
            <tr>
              <th scope="row">Followers</th>
              <td>{props.user.followers}</td>
              <th scope="row">Following</th>
              <td>{props.user.following}</td>
              <th scope="row">Repositories</th>
              <td>{props.user.public_repos}</td>
              <th scope="row">Gists</th>
              <td>{props.user.public_gists}</td>
            </tr>
          }
          {
            props.user.hireable ?
            <tr>
              <th scope="row">Status</th>
              <td colSpan="7">Available to hire</td>
            </tr>
            :
            <tr>
              <th scope="row">Status</th>
              <td colSpan="7">Busy</td>
            </tr>
          }
          {
            props.user.blog &&
            <tr>
              <th scope="row">Website</th>
              <td colSpan="7"><a href={props.user.blog} target="_blank" rel="noopener noreferrer"><span className="badge badge-secondary badge-pill mr-1 mb-1">Check their website</span></a></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </>

export default Owner