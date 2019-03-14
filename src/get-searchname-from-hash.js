export function getSearchNameFromHash(existingQuery) {
    const searchParams = new URLSearchParams(existingQuery);
    const firstName = searchParams.get('f');
    const lastName = searchParams.get('l');
    const searchName = `${firstName}+${lastName}`;
    return searchName.toString();
}