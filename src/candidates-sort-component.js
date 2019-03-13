export default function sortCandidatesByDebateScore(candidates) {
    const newCandidatesArray = candidates.slice();
    return newCandidatesArray.sort((a, b) => {
        if(a.debateScore === b.debateScore) {
            return 0;
        }
        if(a.debateScore > b.debateScore) {
            return -1;
        }
        return 1;
    });
}