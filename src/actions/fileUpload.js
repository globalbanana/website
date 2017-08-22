import fetch from 'isomorphic-fetch'

export function uploadDocumentRequest({ file, name }) {  
    return (dispatch, getState) => {
        var formData = new FormData();
        formData.append('file', file, name);
        formData.append('name', name);

        return fetch('/ajax/upload', {
            method:'POST',
            credentials: 'include',
            body: formData,
        }).then(
            res => res.json()
        )
    }
}