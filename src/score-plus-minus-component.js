export default function scoreCandidates(candidates) {
    candidates.forEach(candidate => {
        const candidatePlusOneButtonNode = document.getElementById(`${candidate.id}-plus-one`);
        const candidateMinusOneButtonNode = document.getElementById(`${candidate.id}-minus-one`);
    
        candidatePlusOneButtonNode.addEventListener('click', () => {
            candidate.debateScore++;
        });
    
        candidateMinusOneButtonNode.addEventListener('click', () => {
            candidate.debateScore--;
        });
    
    });
}
