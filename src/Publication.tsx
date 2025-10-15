// src/Publication.tsx

import React from 'react';

// Fictional data for publications. Replace with your own.
const publicationsData = [
  {
    id: 1,
    year: 2025,
    type: 'journal',
    authors: 'Souza, A.; Andrade, C.',
    title: 'Metabolic adaptations to high-intensity interval training in older adults.',
    source: 'Journal of Aging and Physical Activity',
    details: 'Vol. 33, No. 4, pp. 1579-1590, 2025',
    link: '#', // Replace with the actual link (DOI, etc.)
  },
  {
    id: 2,
    year: 2025,
    type: 'conference',
    authors: 'Ferreira, J.; Martins, L.',
    title: 'The effect of resistance training on bone mineral density in postmenopausal women.',
    source: 'Proceedings of the Brazilian Congress of Biomechanics',
    details: 'OS3-4, p. 35-36, 2025',
    link: '#',
  },
  {
    id: 3,
    year: 2024,
    type: 'journal',
    authors: 'Andrade, C.; Souza, A.',
    title: 'Cardiovascular responses to prolonged exercise in a thermoneutral environment.',
    source: 'Brazilian Journal of Medical and Biological Research',
    details: 'Vol. 57, No. 2, e13045, 2024',
    link: '#',
  },
  {
    id: 4,
    year: 2024,
    type: 'journal',
    authors: 'Martins, L.; Ferreira, J.; Souza, A.',
    title: 'Impact of protein supplementation on muscle hypertrophy.',
    source: 'Nutrients',
    details: 'Vol. 16, No. 15, 2340, 2024',
    link: '#',
  },
];

// --- Helper function to group publications by year ---
const groupPublicationsByYear = (data) => {
  return data.reduce((acc, publication) => {
    const year = publication.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(publication);
    return acc;
  }, {});
};

function Publicacoes() {
  const groupedPublications = groupPublicationsByYear(publicationsData);
  const sortedYears = Object.keys(groupedPublications).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Publicações</h1>

      {sortedYears.map(year => {
        const yearPublications = groupedPublications[year];
        const journalPapers = yearPublications.filter(p => p.type === 'journal');
        const conferencePapers = yearPublications.filter(p => p.type === 'conference');

        return (
          <div key={year} className="mb-5">
            <h2 className="border-bottom pb-2 mb-4">{year}</h2>

            {/* Journal Papers Section */}
            {journalPapers.length > 0 && (
              <div className="mb-4">
                <h5 className="fw-bold">Artigos em Periódicos</h5>
                <ul className="list-unstyled">
                  {journalPapers.map(pub => (
                    <li key={pub.id} className="mb-3">
                      <p className="mb-0">
                        {pub.authors}. <strong>{pub.title}</strong>. 
                        <em> {pub.source}</em>, <a href={pub.link} target="_blank" rel="noopener noreferrer">{pub.details}</a>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conference Papers Section */}
            {conferencePapers.length > 0 && (
              <div>
                <h5 className="fw-bold">Trabalhos em Congressos</h5>
                <ul className="list-unstyled">
                  {conferencePapers.map(pub => (
                    <li key={pub.id} className="mb-3">
                      <p className="mb-0">
                        {pub.authors}. <strong>{pub.title}</strong>. 
                        <em> {pub.source}</em>, <a href={pub.link} target="_blank" rel="noopener noreferrer">{pub.details}</a>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Publicacoes;