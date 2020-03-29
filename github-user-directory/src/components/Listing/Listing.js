import React from "react";
import Language from "./Repository/Language/Language";
import Badge from "./Repository/Badge/Badge";
import Description from "./Repository/Description/Description";
import Title from "./Repository/Title/Title";
import './Listing.css'

const Listing = props => (
  <ul className="list-group">
    {props.data.map(repository => (
      <li
        key={repository.id}
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <Title
          title={repository.name}
          date={repository.pushed_at}
          link={repository.html_url}
        />
        {repository.description && (
          <Description
            title="Description"
            metadata={repository.description}
            class=""
          />
        )}
        {repository.language && (
          <Language
            title="Language"
            metadata={repository.language}
            class="d-block mb-1"
          />
        )}
        <div>
          <Badge
            title="Stars"
            metadata={repository.stargazers_count}
            class="badge badge-info mr-1 mb-1"
          />
          <Badge
            title="Forks"
            metadata={repository.forks_count}
            class="badge badge-success mr-1 mb-1"
          />
          <Badge
            title="Issues"
            metadata={repository.open_issues_count}
            class="badge badge-secondary mr-1 mb-1"
          />
          <Badge
            title="Watchers"
            metadata={repository.watchers_count}
            class="badge badge-dark mr-1 mb-1"
          />
        </div>
      </li>
    ))}
  </ul>
);

export default Listing;
