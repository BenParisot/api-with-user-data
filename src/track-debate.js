import candidates from '../data/candidates.js';
import loadCandidates from './candidate-list-component.js';
import scoreCandidates from './score-plus-minus-component.js';
import sortCandidatesByDebateScore from './candidates-sort-component.js';
import loadHeader from './make-header-component.js';
import loadResults from './results-component.js';
import { auth, candidatesListByUserRef, totalCandidateScoresByUserRef } from './firebase.js';

loadHeader();
loadCandidates(candidates);
scoreCandidates(candidates);

const endDebateButtonNode = document.getElementById('end-debate');
const introNode = document.getElementById('intro');
const resultsSectionNode = document.getElementById('results-section');

endDebateButtonNode.addEventListener('click', () => {
    const sortedCandidates = sortCandidatesByDebateScore(candidates);
    loadCandidates(sortedCandidates);
    const userID = auth.currentUser.uid;
    candidatesListByUserRef.child(userID)
        .set(sortedCandidates);
    
    auth.onAuthStateChanged(user => {
        const userID = user.uid;
        const candidateTotalScoresRef = totalCandidateScoresByUserRef.child(userID);
        candidateTotalScoresRef.once('value') 
            .then(snapshot => {
                const candidateTotals = snapshot.val();
                if(candidateTotals) {
                    totalCandidateScoresByUserRef.child(userID)
                        .set([
                            {
                                id: 'booker',
                                firstName: 'Cory',
                                lastName: 'Booker',
                                image: 'assets/candidates-booker.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'booker').debateScore + candidateTotals.find(candidate => candidate.id === 'booker').totalScore
                            },
                            {
                                id: 'buttigieg',
                                firstName: 'Pete',
                                lastName: 'Buttigieg',
                                image: 'assets/candidates-buttigieg.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'buttigieg').debateScore + candidateTotals.find(candidate => candidate.id === 'buttigieg').totalScore
                            },
                            {
                                id: 'castro',
                                firstName: 'Julian',
                                lastName: 'Castro',
                                image: 'assets/candidates-castro.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'castro').debateScore + candidateTotals.find(candidate => candidate.id === 'castro').totalScore
                            },
                            {
                                id: 'delaney',
                                firstName: 'John',
                                lastName: 'Delaney',
                                image: 'assets/candidates-delaney.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'delaney').debateScore + candidateTotals.find(candidate => candidate.id === 'delaney').totalScore
                            },
                            {
                                id: 'gabbard',
                                firstName: 'Tulsi',
                                lastName: 'Gabbard',
                                image: 'assets/candidates-gabbard.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'gabbard').debateScore + candidateTotals.find(candidate => candidate.id === 'gabbard').totalScore
                            },
                            {
                                id: 'gillibrand',
                                firstName: 'Kirsten',
                                lastName: 'Gillibrand',
                                image: 'assets/candidates-gillibrand.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'gillibrand').debateScore + candidateTotals.find(candidate => candidate.id === 'gillibrand').totalScore
                            },
                            {
                                id: 'harris',
                                firstName: 'Kamala',
                                lastName: 'Harris',
                                image: 'assets/candidates-harris.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'harris').debateScore + candidateTotals.find(candidate => candidate.id === 'harris').totalScore
                            },
                            {
                                id: 'inslee',
                                firstName: 'Jay',
                                lastName: 'Inslee',
                                image: 'assets/candidates-inslee.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'inslee').debateScore + candidateTotals.find(candidate => candidate.id === 'inslee').totalScore
                            },
                            {
                                id: 'klobuchar',
                                firstName: 'Amy',
                                lastName: 'Klobuchar',
                                image: 'assets/candidates-klobuchar.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'klobuchar').debateScore + candidateTotals.find(candidate => candidate.id === 'klobuchar').totalScore
                            },
                            {
                                id: 'ojeda',
                                firstName: 'Richard',
                                lastName: 'Ojeda',
                                image: 'assets/candidates-ojeda.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'ojeda').debateScore + candidateTotals.find(candidate => candidate.id === 'ojeda').totalScore
                            },
                            {
                                id: 'sanders',
                                firstName: 'Bernie',
                                lastName: 'Sanders',
                                image: 'assets/candidates-sanders.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'sanders').debateScore + candidateTotals.find(candidate => candidate.id === 'sanders').totalScore
                            },
                            
                            {
                                id: 'warren',
                                firstName: 'Elizabeth',
                                lastName: 'Warren',
                                image: 'assets/candidates-warren.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'warren').debateScore + candidateTotals.find(candidate => candidate.id === 'warren').totalScore
                            },
                            {
                                id: 'williamson',
                                firstName: 'Marianne',
                                lastName: 'Williamson',
                                image: 'assets/candidates-williamson.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'williamson').debateScore + candidateTotals.find(candidate => candidate.id === 'williamson').totalScore
                            },
                            {
                                id: 'yang',
                                firstName: 'Andrew',
                                lastName: 'Yang',
                                image: 'assets/candidates-yang.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'yang').debateScore + candidateTotals.find(candidate => candidate.id === 'yang').totalScore
                            }
                        ]);

                } else {
                    totalCandidateScoresByUserRef.child(userID)
                        .set([
                            {
                                id: 'booker',
                                firstName: 'Cory',
                                lastName: 'Booker',
                                image: 'assets/candidates-booker.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'booker').debateScore
                            },
                            {
                                id: 'buttigieg',
                                firstName: 'Pete',
                                lastName: 'Buttigieg',
                                image: 'assets/candidates-buttigieg.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'buttigieg').debateScore
                            },
                            {
                                id: 'castro',
                                firstName: 'Julian',
                                lastName: 'Castro',
                                image: 'assets/candidates-castro.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'castro').debateScore
                            },
                            {
                                id: 'delaney',
                                firstName: 'John',
                                lastName: 'Delaney',
                                image: 'assets/candidates-delaney.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'delaney').debateScore
                            },
                            {
                                id: 'gabbard',
                                firstName: 'Tulsi',
                                lastName: 'Gabbard',
                                image: 'assets/candidates-gabbard.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'gabbard').debateScore
                            },
                            {
                                id: 'gillibrand',
                                firstName: 'Kirsten',
                                lastName: 'Gillibrand',
                                image: 'assets/candidates-gillibrand.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'gillibrand').debateScore
                            },
                            {
                                id: 'harris',
                                firstName: 'Kamala',
                                lastName: 'Harris',
                                image: 'assets/candidates-harris.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'harris').debateScore
                            },
                            {
                                id: 'inslee',
                                firstName: 'Jay',
                                lastName: 'Inslee',
                                image: 'assets/candidates-inslee.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'inslee').debateScore
                            },
                            {
                                id: 'klobuchar',
                                firstName: 'Amy',
                                lastName: 'Klobuchar',
                                image: 'assets/candidates-klobuchar.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'klobuchar').debateScore
                            },
                            {
                                id: 'ojeda',
                                firstName: 'Richard',
                                lastName: 'Ojeda',
                                image: 'assets/candidates-ojeda.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'ojeda').debateScore
                            },
                            {
                                id: 'sanders',
                                firstName: 'Bernie',
                                lastName: 'Sanders',
                                image: 'assets/candidates-sanders.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'sanders').debateScore
                            },
                        
                            {
                                id: 'warren',
                                firstName: 'Elizabeth',
                                lastName: 'Warren',
                                image: 'assets/candidates-warren.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'warren').debateScore
                            },
                            {
                                id: 'williamson',
                                firstName: 'Marianne',
                                lastName: 'Williamson',
                                image: 'assets/candidates-williamson.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'williamson').debateScore
                            },
                            {
                                id: 'yang',
                                firstName: 'Andrew',
                                lastName: 'Yang',
                                image: 'assets/candidates-yang.jpg',
                                debateScore: 0,
                                totalScore: sortedCandidates.find(candidate => candidate.id === 'yang').debateScore
                            }
                        ]);
                }
            });
    });
    introNode.hidden = true;
    loadResults();
    resultsSectionNode.hidden = false;
});


