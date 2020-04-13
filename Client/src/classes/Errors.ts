export class UploadAvatarError extends Error {}

export class AddDbError extends Error {}

export const SendError = (field, setError, setState, error) => {
    (document.getElementById("back") as HTMLButtonElement).disabled = false;
    setError({field: true});
    setState(null);
    console.error(error);
  }