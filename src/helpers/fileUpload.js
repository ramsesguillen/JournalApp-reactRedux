
export const fileUpload = async ( file ) => {

    const cloadUrl = 'https://api.cloudinary.com/v1_1/devexb0a6/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch( cloadUrl, {
            method: 'POST',
            body: formData
        });

        if ( resp.ok ) {
            const cloadResp = await resp.json();
            return cloadResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (error) {
        throw error;
    }
}
