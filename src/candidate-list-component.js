export function makeCandidateList(candidate) {
    const html = `
    <li>
                <button id="${candidate.id}-minus-one"> - </button>
                <section class="candidate-detail">
                    <img src="${candidate.image}">
                    <h2>${candidate.lastName}</h2>
                </section>
                <button id="${candidate.id}-plus-one"> + </button>
            </li>`;
    
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export default function loadCandidates(candidates) {
    const candidateListNode = document.getElementById('candidates-list');
    while(candidateListNode.children.length > 0) {
        candidateListNode.lastElementChild.remove();
    }

    candidates.forEach(candidate => {
        const candidateLi = makeCandidateList(candidate);
        candidateListNode.appendChild(candidateLi);
    });
}