import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import '../../Markdown/markdown.css';

export const Regulations = () => {
  let match = useRouteMatch();
  let division = match.url.match(/[^/]+/)[0];

  const [regulations, setRegulations] = useState([]);

  useEffect(() => {
    fetch(`/regulations?division=${division}`)
      .then((res) => res.json())
      .then((regulations) => setRegulations(regulations));
  }, []);

  if (regulations.length === 0) {
    return <section>Ładowanie regulaminu...</section>;
  }
  if (!regulations.content) {
    return <section>Regulamin niedostępny</section>;
  } else {
    return (
      <section>
        <div className='markdown-body'>
          <ReactMarkdown children={regulations.regulations.content} />
        </div>
      </section>
    );
  }
};
